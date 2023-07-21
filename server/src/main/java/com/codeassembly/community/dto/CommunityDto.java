package com.codeassembly.community.dto;

import com.codeassembly.comment.entity.Comment;
import com.codeassembly.community.entity.Community;
import com.codeassembly.user.entity.User;
import lombok.*;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.LocalDateTime;
import java.util.List;

public class CommunityDto {

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Post{
       // private Long userId;
        private String title;
        private String body;
        private String category;


    }
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @EnableJpaAuditing
    public static class Response {

        private Long communityId;
        private String title;
        private String body;
        private String category;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private UserInfo userInfo;
        private Long views;
        private Long liked;
        private List<Comment> comments;

        public Response(Community community, UserInfo userInfo) {
            this.communityId = community.getCommunityId();
            this.title = community.getTitle();
            this.body = community.getBody();
            this.category = community.getCategory();
            this.createdAt = community.getCreatedAt();
            this.updatedAt = community.getUpdatedAt();
            this.userInfo = userInfo; // 받은 userInfo를 설정
            this.views = community.getViews();
            this.liked = community.getLiked();
            this.comments = community.getComments();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserInfo {
        private Long userId;
        private String nickName;
        private String email;

        public UserInfo(User user) {
            this.userId = user.getUserId();
            this.nickName = user.getNickname();
            this.email = user.getEmail();
        }
    }
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Patch {
        private Long communityId;
        private String title;
        private String body;
        private String category;
    }
}
