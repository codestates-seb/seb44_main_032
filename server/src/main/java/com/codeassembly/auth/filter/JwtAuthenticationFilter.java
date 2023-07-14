package com.codeassembly.auth.filter;

import com.codeassembly.auth.jwt.JwtTokenizer;
import com.codeassembly.response.SingleResponseDto;
import com.codeassembly.user.dto.LoginDto;
import com.codeassembly.user.dto.LoginResponseDto;
import com.codeassembly.user.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


// Username/Password 기반의 인증을 처리
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    // 로그인 인증 정보(Username/Password)를 전달받아 UserDetailsService와 인터랙션 한 뒤 인증 여부를 판단
    private final AuthenticationManager authenticationManager;

    // 클라이언트가 인증에 성공할 경우, JWT를 생성 및 발급하는 역할
    private final JwtTokenizer jwtTokenizer;


    // 인증 시도
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        // Username과 Password 정보를 포함한 UsernamePasswordAuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken); // 인증 처리 위임
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        User user = (User) authResult.getPrincipal(); // Member 엔티티 클래스의 객체를 얻음
        String accessToken = delegateAccessToken(user);
        String refreshToken = delegateRefreshToken(user);

        ObjectMapper mapper = new ObjectMapper();

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setName(user.getName());
        loginResponseDto.setEmail(user.getEmail());
        loginResponseDto.setUserId(user.getUserId());

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset-UTF-8");
        response.getWriter().write(mapper.writeValueAsString(new SingleResponseDto<>(loginResponseDto)));

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    private String delegateAccessToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getEmail());
        claims.put("roles", user.getRoles());

        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(User user) {
        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}