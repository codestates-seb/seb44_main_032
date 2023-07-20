package com.codeassembly.user.service;

import com.codeassembly.audit.Auditable;
import com.codeassembly.auth.CustomAuthorityUtils;
import com.codeassembly.config.SecurityConfiguration;
import com.codeassembly.exception.BusinessLogicException;
import com.codeassembly.exception.ExceptionCode;
import com.codeassembly.user.entity.User;
import com.codeassembly.user.repository.UserRepository;
import com.codeassembly.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

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
            verifyExistsUser(user.getUserId());
        }
        user.setPassword(securityConfiguration.passwordEncoder().encode(user.getPassword()));
        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);
        return userRepository.save(user);

    }

    // 존재하는 회원인지 확인
    public void verifyExistsUser(long userId) {
        boolean exists = userRepository.findByUserId(userId).isPresent();
        if (exists) throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }

    // userId로 확인하는 방법
    public User findByUserId(long userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }
    // userEmail 로 확인하는 방법
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.EMAIL_NOT_FOUND));
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public User updateUser(UserDto.Patch patch) {
        User findUser = findVerifiedUser(patch.getUserId());

        Optional.ofNullable(patch.getName())
                .ifPresent(name -> findUser.setName(name));
        Optional.ofNullable(patch.getNickname())
                .ifPresent(nickname -> findUser.setNickname(nickname));
        Optional.ofNullable(patch.getEmail())
                .ifPresent(email -> findUser.setEmail(email));

        return userRepository.save(findUser);
    }

    public User findUser(long userId) {
        return findVerifiedUser(userId);
    }

    @Transactional(readOnly = true)
    public User findVerifiedUser(long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }

    //회원 탈퇴
    public User deleteUser(long userId) {
        verifyExistsUser(userId); // 회원이 존재하는지 확인

        User findUser = findUser(userId);
        userRepository.delete(findUser);

        return findUser;

    }


}