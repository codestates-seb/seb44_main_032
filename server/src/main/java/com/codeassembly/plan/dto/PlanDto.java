package com.codeassembly.plan.dto;

import com.codeassembly.community.dto.CommunityDto;
import com.codeassembly.community.dto.CommunityDto.UserInfo;
import com.codeassembly.user.entity.User;
import java.time.LocalDateTime;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

public class PlanDto {
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Post {
        private Long userId;
        @NotBlank
        private String title;
        @NotBlank
        private String body;
//        private String category;
    }
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @EnableJpaAuditing
    public static class Response {
        private Long planId;
        private String title;
        private String body;
        private UserInfo userInfo;
        private String category;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
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
        private Long planId;
        private String title;
        private String body;
        private String category;
    }
}
