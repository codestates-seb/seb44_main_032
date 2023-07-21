package com.codeassembly.plan.dto;

import com.codeassembly.community.dto.CommunityDto;
import com.codeassembly.community.dto.CommunityDto.UserInfo;
import com.codeassembly.plan.entity.Plan;
import com.codeassembly.user.entity.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
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
//        private Long userId;
        @NotBlank
        private String title;
        @NotBlank
        private String body;
        @NotBlank
        @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}" ,
                 message = "ex) 2023-07-15 형식으로 작성해 주세요.")
        private String startDate;
        @NotBlank
        @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}" ,
                 message = "ex) 2023-07-15 형식으로 작성해 주세요.")
        private String endDate;
        private String category;
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
        private String startDate;
        private String endDate;
        private UserInfo userInfo;
        private String category;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Response(Plan plan, UserInfo userInfo) {
            this.planId = plan.getPlanId();
            this.title = plan.getTitle();
            this.body = plan.getBody();
            this.startDate = String.valueOf(plan.getStartDate());
            this.endDate = String.valueOf(plan.getEndDate());
            this.userInfo = userInfo;
            this.category = plan.getCategory();
            this.createdAt = plan.getCreatedAt();
            this.updatedAt = plan.getUpdatedAt();
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
        private Long planId;
        private String title;
        private String body;
        private String category;
        private String startDate;
        private String endDate;
    }
}
