package com.codeassembly.user.service;

import com.codeassembly.Exception.BusinessLogicException;
import com.codeassembly.user.repository.UserRepository;
import com.codeassembly.user.userEntity.User;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.codeassembly.Exception.ExceptionCode;
import java.util.Optional;

@Service

public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public User createUser(User user){
        Optional<User> findUser = userRepository.findByEmail(user.getEmail());
        user.checkExistEmail(findUser);                     // 동일한 이메일이 있는지 check
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);                // 비밀번호 암호화 하기
        //user.setRoles(authorityUtils.createRoles(user.getEmail())); auth쪽이라 일단 보류
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        User findUser = findVerifiedUser(user.getUserId());

        Optional.ofNullable(user.getPassword())
                .ifPresent(password -> findUser.setEmail(password));
        Optional.ofNullable(user.getNickName())
                .ifPresent(nickName -> findUser.setNickName(nickName));
        Optional.ofNullable(user.getUserStatus())
                .ifPresent(status -> findUser.setUserStatus(status));

        return userRepository.save(findUser);

    }
    @Transactional(readOnly = true)
    public User findVerifiedUser(long memberId) {
        Optional<User> optionalMember =
                userRepository.findById(memberId);
        User findUser =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }
}
