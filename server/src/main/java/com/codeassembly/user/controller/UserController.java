package com.codeassembly.user.controller;


import com.codeassembly.auth.JwtTokenizer;
import com.codeassembly.response.SingleResponseDto;
import com.codeassembly.user.dto.UserDto;
import com.codeassembly.user.entity.User;
import com.codeassembly.user.mapper.UserMapper;
import com.codeassembly.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Validated
@Slf4j
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;
    private final UserMapper mapper;
    private final JwtTokenizer jwtTokenizer;


    @PostMapping("/join")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post requestBody) {
        User createdUser = userService.createUser(mapper.userDtoPostTOUser(requestBody));
        UserDto.Response  response = mapper.userTOUserDTOResponse(createdUser);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

}
