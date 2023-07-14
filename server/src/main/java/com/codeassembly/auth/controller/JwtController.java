package com.codeassembly.auth.controller;

import com.codeassembly.auth.JwtTokenizer;
import com.codeassembly.user.entity.User;
import com.codeassembly.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.MalformedURLException;
@Slf4j
@RestController
@RequestMapping("/token")
@RequiredArgsConstructor
public class JwtController {
    private final JwtTokenizer jwtTokenizer;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> regenerateAccessToken(HttpServletResponse response,
                                                   @RequestHeader("Refresh") String refreshToken) {
        log.info("[JwtController] regenerateAccessToken called");
        jwtTokenizer.validateToken(refreshToken);
        String userId = jwtTokenizer.getUsername(refreshToken);
        User user = userService.findByUserId(Long.parseLong(userId));
        String accessToken = jwtTokenizer.delegateAccessToken(user);

        response.setHeader("Authorization", accessToken);

        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(HttpServletRequest request) {
//        String authorizationHeader = request.getHeader("Authorization");
//        if (StringUtils.hasText(authorizationHeader) && authorizationHeader.startsWith("Bearer ")) {
//            String token = authorizationHeader.substring(7);
//            jwtTokenizer.invalidateToken(token);
//        }
//
//        return ResponseEntity.ok().build();
//    }
//
//    /** 로그아웃 로직
//     * 헤더 (Header): 로그인 시 얻은 JWT 토큰을 Authorization 헤더에 추가하기  예를 들어, Authorization: Bearer 토큰값 형식 추가.
//     * 응답: 로그아웃 요청에 대한 응답으로 200 OK 상태 코드를 받아올 것입니다.
//    * */



}