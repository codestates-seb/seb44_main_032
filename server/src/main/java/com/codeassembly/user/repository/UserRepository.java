package com.codeassembly.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.codeassembly.user.entity.User;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserId(long userId);
    Optional<User> findByEmail(String email);

//    Optional<User> findByUserId(String userId);
//    User findByEmail(String email);
}
