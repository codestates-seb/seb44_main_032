package com.codeassembly.user.entity;

import com.codeassembly.audit.Auditable;
import com.codeassembly.comment.entity.Comment;
import com.codeassembly.community.entity.Community;
import com.codeassembly.exception.BusinessLogicException;
import com.codeassembly.exception.ExceptionCode;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String nickname;

    // user 권한 부여
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Community> communities = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Community> plans = new ArrayList<>();

    public static void checkExistEmail(Optional<User> targetUser) {
        if(targetUser.isPresent())
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments;

}
