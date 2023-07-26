package com.codeassembly.auth.service;


// 데이터베이스에서 조회한 User의 인증 정보를 기반으로 인증을 처리

import com.codeassembly.auth.util.CustomAuthorityUtils;
import com.codeassembly.exception.BusinessLogicException;
import com.codeassembly.exception.ExceptionCode;
import com.codeassembly.user.repository.UserRepository;
import com.codeassembly.user.entity.User;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
@RequiredArgsConstructor

public class AuthenticatedDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final CustomAuthorityUtils authorityUtils;


    // username으로 user 찾음
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByEmail(username);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return new MemberDetails(findUser);
    }

    private final class MemberDetails extends User implements UserDetails {
        MemberDetails(User user) {
            setUserId(user.getUserId());
            setEmail(user.getEmail());
            setPassword(user.getPassword());
            setRoles(user.getRoles());
            setName(user.getName());
        }

        // User의 권한 정보 생성
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
