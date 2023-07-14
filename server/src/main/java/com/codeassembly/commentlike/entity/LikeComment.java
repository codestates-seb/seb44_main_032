package com.codeassembly.commentlike.entity;

import com.codeassembly.comment.entity.Comment;
import com.codeassembly.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;

import java.time.LocalDate;

import static javax.persistence.FetchType.LAZY;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table
public class LikeComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "likeComment_id")
    private Long Id;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_Id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;
    @Column(nullable = false)
    private boolean status; // true = 좋아요, false = 좋아요 취소
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate createDate; // 날짜

    @PrePersist // DB에 INSERT 되기 직전에 실행. 즉 DB에 값을 넣으면 자동으로 실행됨
    public void createDate() {
        this.createDate = LocalDate.now();
    }

    public LikeComment(Comment comment, User user) {
        this.comment = comment;
        this.user = user;
        this.status = true;
    }

    public void unLikeComment(Comment comment) {
        this.status = false;
        comment.setLiked(comment.getLiked() - 1);
    }
}
