package com.codeassembly.community.dto;

import com.codeassembly.user.entity.User;
import lombok.*;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.LocalDateTime;

public class CommunityDto {

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Post{
        private Long userId;
        private String title;
        private String body;


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
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private UserInfo userInfo;
        private Long views;

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
    }
}
