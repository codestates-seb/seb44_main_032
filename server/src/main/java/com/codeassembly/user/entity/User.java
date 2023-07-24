package com.codeassembly.user.entity;

import com.codeassembly.audit.Auditable;
import com.codeassembly.comment.entity.Comment;
import com.codeassembly.community.entity.Community;
import com.codeassembly.exception.BusinessLogicException;
import com.codeassembly.exception.ExceptionCode;
import com.codeassembly.plan.entity.Plan;
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
@Table
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    /**
     * @Author 영범
     * OAuth 로그인은 pw not null 이면 안된다.
     * */
    @Column
    private String password;

    @Column(nullable = false)
    private String name;

//    @Column(nullable = false, unique = true)
    @Column(unique = true)
    private String nickname;

    // user 권한 부여
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();


    @OneToMany(mappedBy = "user")
    private List<Community> communities = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Plan> plans = new ArrayList<>();


    public static void checkExistEmail(Optional<User> targetUser) {
        if(targetUser.isPresent())
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments;

    public User(String email, String name, String nickname) {
        this.email = email;
        this.name = name;
        this.nickname = nickname;
    }
}
