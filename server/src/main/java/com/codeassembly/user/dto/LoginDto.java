package com.codeassembly.user.dto;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;

@Getter
public class LoginDto {
    private String email;
    private String password;

}
