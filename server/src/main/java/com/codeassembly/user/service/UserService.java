package com.codeassembly.user.service;

import com.codeassembly.audit.Auditable;
import com.codeassembly.auth.CustomAuthorityUtils;
import com.codeassembly.config.SecurityConfiguration;
import com.codeassembly.exception.BusinessLogicException;
import com.codeassembly.exception.ExceptionCode;
import com.codeassembly.user.entity.User;
import com.codeassembly.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class UserService extends Auditable {

    private final UserRepository userRepository;
    private final SecurityConfiguration securityConfiguration;
    private final CustomAuthorityUtils authorityUtils;

    public User createUser(User user) {
        if (user.getUserId() != null) {
            verifyExistsUser(user.getEmail());
        }
        user.setPassword(securityConfiguration.passwordEncoder().encode(user.getPassword()));
        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);
        return userRepository.save(user);

    }

    // 존재하는 회원인지 확인
    public void verifyExistsUser(String email) {
        boolean exists = userRepository.findByEmail(email).isPresent();
        if (exists) throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }


    // userEmail로 확인하는 방법
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }
}
