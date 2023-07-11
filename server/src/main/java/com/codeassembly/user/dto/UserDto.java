package com.codeassembly.user.dto;

import com.codeassembly.audit.Auditable;
import com.codeassembly.user.entity.User;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Builder
@AllArgsConstructor
@Getter
public class UserDto extends Auditable {

    //회원 가입 로직에 인증과 관련된 코드 추가
    @AllArgsConstructor
    @Getter
    public static class Post {
        @NotBlank
        @Email
        private String email;

        @NotBlank
        @Pattern(regexp = "^(?=.*[!@#$%^&*()_+\\\\-\\\\[\\\\]{};':\\\"\\\\\\\\|,.<>/?]).{8,}$" ,
                message = "특수문자를 1개를 포함하여 8자리 이상으로 작성해주세요")
        private String password;

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String name;

        @NotBlank(message = "별명은 공백이 아니어야 합니다.")
        private String nickname;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {
        private long userId;
        @NotBlank
        @Email
        private String email;
        private String password;
        private String name;
        private String nickname;

    }
    @Getter
    @Setter
    public static class Response {
        private long userId;
        private String email;
        private String name;
        private String nickname;

    }

}
