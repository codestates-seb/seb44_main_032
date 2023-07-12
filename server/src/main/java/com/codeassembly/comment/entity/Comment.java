package com.codeassembly.comment.entity;

import com.codeassembly.audit.Auditable;
import com.codeassembly.community.entity.Community;
import com.codeassembly.user.entity.User;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long commentId;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String commentBody;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "communityId")
    private Community community;


}
