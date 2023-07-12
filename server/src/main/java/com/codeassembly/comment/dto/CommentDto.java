package com.codeassembly.comment.dto;


import com.codeassembly.audit.Auditable;
import com.codeassembly.comment.entity.Comment;
import com.codeassembly.community.entity.Community;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;


public class CommentDto {
//    private Long commentId;
//    private String commentBody;
//    private String writerName;
//
//    public static CommentDto from(Comment comment) {
//        return CommentDto.builder()
//                .writerName(comment.getUser().getName())
//                .build();
//    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class Post {
        @NotBlank
        private String commentBody;
    }


    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Builder
    public static class PostResponse {
        private Long communityId;
        private Long commentId;
        private String commentBody;

        public static PostResponse from(Comment comment, Community community) {
            return PostResponse.builder()
                    .communityId(community.getCommunityId())
                    .commentId(comment.getCommentId())
                    .commentBody(comment.getCommentBody())
                    .build();
        }
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class Patch {
        private long commentId;
        private long communityId;
        @NotBlank
        private String commentBody;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Builder
    public static class PatchResponse {
        private long commentId;
        private String commentBody;

        public static PatchResponse from(Comment comment) {
            return PatchResponse.builder()
                    .commentId(comment.getCommentId())
                    .commentBody(comment.getCommentBody())
                    .build();
        }
    }

}
