package com.codeassembly.user.service;

import com.codeassembly.Exception.BusinessLogicException;
import com.codeassembly.user.repository.UserRepository;
import com.codeassembly.user.userEntity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.codeassembly.Exception.ExceptionCode;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;

    }
    public User createUser(User user){
        Optional<User> findUser = userRepository.findByEmail(user.getEmail());
        user.checkExistEmail(findUser);                     // 동일한 이메일이 있는지 check
                      // 비밀번호 암호화 하기
        //user.setRoles(authorityUtils.createRoles(user.getEmail())); 일단 보류
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
    public User findUser(long userId) {
        User findUser = userRepository.
                findById(userId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return findUser;
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

    public void deleteUser(long userId) {
        User findUser = findUser(userId);
        userRepository.delete(findUser);
    }
}
