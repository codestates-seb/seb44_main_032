package com.codeassembly.comment.controller;

import com.codeassembly.auth.JwtTokenizer;
import com.codeassembly.comment.dto.CommentDto;
import com.codeassembly.comment.service.CommentService;
import com.codeassembly.exception.BusinessLogicException;
import com.codeassembly.exception.ExceptionCode;
import com.codeassembly.response.SingleResponseDto;
import com.codeassembly.user.dto.UserDto;
import com.codeassembly.user.entity.User;
import com.codeassembly.user.service.UserService;
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
@RequestMapping("/comment")
@Validated
@Slf4j
public class CommentController {

    private final UserService userService;
    private final CommentService commentService;
    private final JwtTokenizer jwtTokenizer;

    public CommentController(UserService userService, CommentService commentService, JwtTokenizer jwtTokenizer) {
        this.userService = userService;
        this.commentService = commentService;
        this.jwtTokenizer = jwtTokenizer;
    }


    @PostMapping("/{communityId}/registration/{userId}")
    public ResponseEntity postComment(@Positive @PathVariable("communityId") long communityId,
                                      @PathVariable("userId") String userId,
                                      @Valid @RequestBody CommentDto.Post requestBody,
                                      @RequestHeader("Authorization") String token) {

        String tokenId = jwtTokenizer.getUsername(token);

        if (!userId.matches("\\d+")) {
            // userId 값이 숫자로만 구성되지 않은 경우 에러 처리
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid userId");
        }

        CommentDto.PostResponse response = commentService.createComment(communityId, requestBody, Long.parseLong(userId));
        // 토큰 정보를 응답에 포함시킴
        Map<String, Object> responsePost = new HashMap<>();
        responsePost.put("token", tokenId);
        responsePost.put("response", response);

        return ResponseEntity.ok(new SingleResponseDto<>(responsePost));

    }

    @PatchMapping("/{commentId}")
    public ResponseEntity patchComment(@Positive @PathVariable("commentId") long commentId,
                                       @Valid @RequestBody CommentDto.Patch requestBody,
                                       @RequestHeader("Authorization") String token) {

        String userId = jwtTokenizer.getUsername(token);
        CommentDto.PatchResponse response = commentService.updateComment(commentId, requestBody, userId);
        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }



    @DeleteMapping("/{commentId}")
    public ResponseEntity deleteComment(@Positive @PathVariable("commentId") long commentId,
                                        @RequestHeader("Authorization") String token) {

        String tokenId = jwtTokenizer.getUsername(token);
        commentService.deleteComment(commentId, tokenId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }

    @PostMapping("/like/{commentId}")
    public ResponseEntity likeComment(@PathVariable("commentId") Long commentId,
                                      @RequestHeader("Authorization") String token) {

        String getToken = jwtTokenizer.getUsername(token);

        String likedCommunity = commentService.likeComment(commentId);

        // 토큰 정보를 응답에 포함시킴
        Map<String, Object> responseLike = new HashMap<>();
        responseLike.put("token", getToken);
        responseLike.put("data", likedCommunity);

        return new ResponseEntity<>(responseLike, HttpStatus.OK);
    }



//    @PostMapping("/like/{commentId}")
//    public ResponseEntity likeComment(@PathVariable("commentId") Long commentId,
//                                      @RequestHeader("Authorization") String token) {
//
//        String getToken = jwtTokenizer.getUsername(token);
//
//        if (getToken == null) {
//            // 인증 정보가 없는 경우 예외 처리
//            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);
//        }
//
////        String likedComment = commentService.likeComment(commentId);
//        String likedComment = commentService.likeComment(commentId, getToken);
//
//        // 토큰 정보를 응답에 포함시킴
//        Map<String, Object> responseLike = new HashMap<>();
//        responseLike.put("token", getToken);
//        responseLike.put("data", likedComment);
//
//        return new ResponseEntity<>(responseLike, HttpStatus.OK);
//    }
}
