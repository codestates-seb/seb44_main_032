package com.codeassembly.audit;

import com.codeassembly.auth.CustomAuthorityUtils;
import com.codeassembly.auth.JwtTokenizer;
import com.codeassembly.response.ErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final ObjectMapper objectMapper;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils authorityUtils,
                                 ObjectMapper objectMapper) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            final ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.BAD_REQUEST,
                    "token expired");
            response.setStatus(401);
            response.getWriter().write(errorResponse.getMessage());
        }


    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");



        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String email = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }
}