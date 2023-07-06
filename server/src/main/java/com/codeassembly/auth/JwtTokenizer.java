package com.codeassembly.auth;


// step1. 로그인 인증에 성공한 클라이언트에게 JWT를 생성 및 발급,  step2. 클라이언트의 요청이 들어올 때마다 전달된 JWT를 검증

import com.codeassembly.user.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Component
public class JwtTokenizer {

    @Getter
    @Value("${jwt.key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    //Step1. 로그인 인증에 성공한 클라이언트에게 JWT를 생성 및 발급

    // 0. Plain Text 형태인 Secret Key의 byte[]를 Base64 형식의 문자열로 인코딩하는 메서드
    // why? base64 : 특수문자 때문에!
    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    /** 1. 인증된 사용자에게 JWT를 최초로 발급해 주기 위한 JWT 생성 메서드     *
     * Map은 Key-Value 데이터의 집합의먀 순서는 유지X 키 중복X

     ** return 부분은 JWT에 담을 내용을 기입 하는 것
     * 1-2-1 Base64 형식 Secret Key 문자열을 이용한 Key 객체 생성
     * 1-2-2 인증된 사용자와 관련된 정보를 담는 setClaims(claims) 추가
     * 1-2-3 JWT 제목 추가
     * 1-2-4 JWT 발행 일자 설정
     * 1-2-5 JWT 만료일시 지정
     * 1-2-6 서명을 위한 Key 객체 설정
     * 1-2-7 JWT 생성 및 직렬화
     * ## Key(java.security.Key) /  JWT 발행 일자, 만료일자(java.util.Date 타입)
     */
    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);  // 1-2-1

        return Jwts.builder()
                .setClaims(claims)                                     // 1-2-2
                .setSubject(subject)                                   // 1-2-3
                .setIssuedAt(Calendar.getInstance().getTime())         // 1-2-4
                .setExpiration(expiration)                             // 1-2-5
                .signWith(key)                                         // 1-2-6
                .compact();                                            // 1-2-7
    }


    /** 2. Access Token이 만료되었을 경우, Access Token을 새로 생성할 수 있게 해주는 Refresh Token을 생성하는 메서드
     * AccessToken과 차이점은 Refresh Token의 경우 Access Token을 새로 발급해 주는 역할을 하는 Token이기 때문에 별도의 Custom Claims는 추가할 필요가 없다
     */
    public String generateRefreshToken(String subject, Date expiration, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    /** 3. JWT의 서명에 사용할 Secret Key를 생성 (1-2-6 참고)
     * 3-1 Decoders.BASE64.decode() 메서드는 Base64 형식으로 인코딩 된 Secret Key를 디코딩한 후, byte array를 반환
     * 3-2 Keys.hmacShaKeyFor() 메서드는 key byte array를 기반으로 적절한 HMAC 알고리즘을 적용한 Key(java.security.Key) 객체를 생성
     */
    public Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);     // 3-1
        Key key = Keys.hmacShaKeyFor(keyBytes);                               // 3-2

        return key;
    }




    //Step2. 클라이언트의 요청이 들어올 때마다 전달된 JWT를 검증

    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);
        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
        return claims;
    }

    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    public String getUsername(String token) {
        String jws = token.replace("Bearer ", "");
        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());
        return getClaims(jws, base64EncodedSecretKey).getBody().getSubject();
    }

    public boolean validateToken(String token) {
        if (!StringUtils.hasText(token)) return false;
        String jwt = token.replace("Bearer ", "");
        Claims claims = parseClaims(jwt);

        return !claims.getExpiration().before(new Date());
    }

    private Claims parseClaims(String token) {
        try {
            return Jwts.parser().setSigningKey(getKeyFromBase64EncodedKey(encodeBase64SecretKey(secretKey))).parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public String delegateAccessToken(User user ) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getEmail());
        claims.put("roles", user.getRoles());

        String subject = user.getEmail();
        Date expiration = getTokenExpiration(getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());

        return generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

}
