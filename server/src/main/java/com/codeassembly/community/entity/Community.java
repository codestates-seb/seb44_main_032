package com.codeassembly.community.entity;

import com.codeassembly.audit.Auditable;
import com.codeassembly.communitylike.entity.LikeCommunity;
import com.codeassembly.comment.entity.Comment;
import com.codeassembly.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.List;

@Entity(name = "Community")
@NoArgsConstructor
@Getter
@Setter
public class Community extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityId;
    private String title;
    private String body;
    @Column(nullable = false)
    private long views; //조회수
    @ManyToOne(fetch = FetchType.LAZY) //유저와 n:1
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column(nullable = false)
    private long liked; //좋아요

    private String category;

    public void setUser(User user) {
        this.user = user;
        if(!this.user.getCommunities().contains(this)){
            this.user.getCommunities().add(this);
        }
    }

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL)
    private List<Comment> comments;

}
