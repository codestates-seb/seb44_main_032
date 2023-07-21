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
import java.util.HashMap;
import java.util.Map;

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

    //회원가입
    @PostMapping("/join")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post requestBody) {

        User createdUser = userService.createUser(mapper.userDtoPostTOUser(requestBody));
        UserDto.Response response = mapper.userTOUserDTOResponse(createdUser);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    //회원정보 수정
    @PatchMapping("/edit/{userId}")
    public ResponseEntity patchUser(@PathVariable("userId") @Positive long userId,
                                    @Valid @RequestBody UserDto.Patch requestBody,
                                    @RequestHeader("Authorization") String token) {
//        test용
//        userId = 8L;

        requestBody.setUserId(userId);
        String getToken = jwtTokenizer.getUsername(token);
        User updatedUser = userService.updateUser(mapper.userDtoPatchTOUser(requestBody));
        UserDto.Response response = mapper.userTOUserDTOResponse(updatedUser);


        // 토큰 정보를 응답에 포함시킴
        Map<String, Object> responsePatch = new HashMap<>();
        responsePatch.put("token", getToken);
//        responsePatch.put("test", userId);
        responsePatch.put("user", response);

        return new ResponseEntity<>(new SingleResponseDto<>(responsePatch), HttpStatus.OK);
    }

    //회원 탈퇴
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity deleteUser(@PathVariable("userId") @Positive long userId,
                                     @RequestHeader("Authorization") String token) {
//        userId = 8L;
        String getToken = jwtTokenizer.getUsername(token);


        User deletedUser = userService.deleteUser(userId);

        // 토큰 정보를 응답에 포함시킴
        Map<String, Object> responseCreate = new HashMap<>();
        responseCreate.put("token", getToken);
        responseCreate.put("data", deletedUser);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    회원 로그아웃 블랙리스트로
//    @PostMapping("/logout/logout")
//    public ResponseEntity logout(@RequestHeader("Authorization") String token) {
//        String jwt = token.substring(7); // Bearer 제거
//        // 토큰이 블랙리스트에 있는 경우
//        if (tokenBlacklistService.isTokenBlacklisted(jwt)) {
//            return new ResponseEntity<>(ExceptionCode.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
//        } else { // 토큰을 블랙리스트에 추가
//            tokenBlacklistService.addTokenToBlacklist(jwt);
//            return new ResponseEntity<>(HttpStatus.OK);
//        }
//    }

}


