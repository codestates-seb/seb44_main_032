package com.codeassembly.comment.service;

import com.codeassembly.comment.dto.CommentDto;
import com.codeassembly.comment.entity.Comment;
import com.codeassembly.comment.repository.CommentRepository;
import com.codeassembly.community.entity.Community;
import com.codeassembly.community.service.CommunityService;
import com.codeassembly.exception.BusinessLogicException;
import com.codeassembly.exception.ExceptionCode;
import com.codeassembly.user.entity.User;
import com.codeassembly.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final UserService userService;
    private final CommunityService communityService;
    private final CommentRepository commentRepository;


    public CommentDto.PostResponse createComment(long communityId, CommentDto.Post post, long userId) {
        User user = userService.findByUserId(userId);
        Community community = communityService.findCommunity(communityId);

        Comment comment = Comment.builder()
                .community(community)
                .commentBody(post.getCommentBody())
                .user(user)
                .build();

        Comment savedComment = commentRepository.save(comment);

        return CommentDto.PostResponse.from(savedComment, community);
    }

    public CommentDto.PatchResponse updateComment(long commentId, CommentDto.Patch patch, long userId) {
        User user = userService.findByUserId(userId);
        Comment comment = findComment(commentId);

        validateWriter(comment, user);

        Optional.ofNullable(patch.getCommentBody())
                .ifPresent(CommentBody -> comment.setCommentBody(CommentBody));

        return CommentDto.PatchResponse.from(comment);
    }
    @Transactional
    public Comment findComment(long commentId) {
        Comment findComment = commentRepository.findById(commentId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }

    private static void validateWriter(Comment comment, User user) {
        if (user.getUserId() != comment.getUser().getUserId()) {
            throw new BusinessLogicException(ExceptionCode.UNMATCHED_COMMENT_WRITER);
        }
    }

    @Transactional
    public void deleteComment(long commentId, long userId) {
        User user = userService.findByUserId(userId);
        Comment comment = findComment(commentId);

        validateWriter(comment, user);

        commentRepository.delete(comment);
    }


}
