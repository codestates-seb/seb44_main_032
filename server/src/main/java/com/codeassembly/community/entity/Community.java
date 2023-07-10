package com.codeassembly.community.entity;

import com.codeassembly.audit.BaseEntity;
import com.codeassembly.user.userEntity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "Community")
@NoArgsConstructor
@Getter
@Setter
public class Community extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityId;
    private String title;
    private String body;
    @Column(nullable = false)
    private int views; //조회수
    @ManyToOne(fetch = FetchType.LAZY) //유저와 n:1
    @JoinColumn(name = "userId")
    private User user;


    public void setUser(User user) {
        this.user = user;
        if(!this.user.getCommunities().contains(this)){
            this.user.getCommunities().add(this);
        }
    }
}
