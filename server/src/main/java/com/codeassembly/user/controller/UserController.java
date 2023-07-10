package com.codeassembly.user.controller;

import com.codeassembly.response.SingleResponseDto;
import com.codeassembly.user.dto.UserDto;
import com.codeassembly.user.mapper.UserMapper;
import com.codeassembly.user.service.UserService;
import com.codeassembly.user.userEntity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Controller
@RequestMapping("/user")
public class UserController {
    private UserMapper mapper;
    private UserService userService;
    public UserController(UserMapper mapper, UserService userService){
        this.mapper = mapper;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity createUser(@Valid @RequestBody UserDto.Post requestBody
    ){
        User user = mapper.userPostDtoToUser(requestBody);
        User createUser = userService.createUser(user);
        return new ResponseEntity<>(mapper.userToResponseDto(createUser), HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity getUser(@PathVariable("userId") @Positive Long userId) {
        User user = userService.findUser(userId);
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.userToResponseDto(user)), HttpStatus.OK);
    }

    @PatchMapping("/edit/{userId}")
    public ResponseEntity updateUser(@PathVariable("userId") @Positive Long userId,
                                     @Valid @RequestBody UserDto.Patch requestBody){
        User user = mapper.userPatchDtoToUser(requestBody);
        user.setUserId(userId);
        User updateUser = userService.updateUser(user);
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.userToResponseDto(updateUser)),HttpStatus.OK);

    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity deleteUser(@PathVariable("userId") @Positive long userId){
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}