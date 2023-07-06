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
import org.springframework.web.bind.annotation.*;

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
        String userEmail = jwtTokenizer.getUsername(refreshToken);
        User user = userService.findUserByEmail(userEmail);
        String accessToken = jwtTokenizer.delegateAccessToken(user);

        response.setHeader("Authorization", accessToken);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
