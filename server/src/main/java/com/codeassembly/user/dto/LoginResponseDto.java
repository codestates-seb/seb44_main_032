package com.codeassembly.user.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto {
    private long userId;
    private String name;
    private String email;
}
