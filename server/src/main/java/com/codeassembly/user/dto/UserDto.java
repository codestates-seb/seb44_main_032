package com.codeassembly.user.dto;

import com.codeassembly.user.userEntity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter

public class UserDto {
    @AllArgsConstructor
    @Getter
    public static class Post {
        @NotBlank
        @Email
        private String email;
        @NotBlank
        private String password;
        private String nickName;
    }
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

        private long userId;
        private String email;
        private String nickName;


    }
    @Getter
    @AllArgsConstructor
    public static class Patch {
        private String nickName;
        private String password;
        private User.UserStatus userStatus;
    }
}
