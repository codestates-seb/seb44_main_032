package com.codeassembly.commentlike.repository;

import com.codeassembly.comment.entity.Comment;
import com.codeassembly.commentlike.entity.LikeComment;
import com.codeassembly.community.entity.Community;
import com.codeassembly.communitylike.entity.LikeCommunity;
import com.codeassembly.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeCommentRepository extends JpaRepository<LikeComment, Long> {
    LikeComment findByUserAndComment(User user, Comment comment);
}
