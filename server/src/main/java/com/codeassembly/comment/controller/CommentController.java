package com.codeassembly.comment.controller;

import com.codeassembly.auth.JwtTokenizer;
import com.codeassembly.comment.dto.CommentDto;
import com.codeassembly.comment.service.CommentService;
import com.codeassembly.response.SingleResponseDto;
import com.codeassembly.user.dto.UserDto;
import com.codeassembly.user.entity.User;
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
@RequestMapping("/community/{communityId}/comments")
@Validated
@Slf4j
public class CommentController {

    private final CommentService commentService;
    private final JwtTokenizer jwtTokenizer;


    public CommentController(CommentService commentService, JwtTokenizer jwtTokenizer) {
        this.commentService = commentService;
        this.jwtTokenizer = jwtTokenizer;
    }

    @PostMapping
    public ResponseEntity postComment(@Positive @PathVariable("communityId") Long communityId,
                                      @Valid @RequestBody CommentDto.Post requestBody,
                                      @RequestHeader("Authorization") String token) {

        //postman test 용
//        Long userId = 8L;
//
//        CommentDto.PostResponse response = commentService.createComment(communityId, requestBody, userId);
//        return ResponseEntity.ok(new SingleResponseDto<>(response));

        String userId = jwtTokenizer.getUsername(token);
        CommentDto.PostResponse response = commentService.createComment(communityId, requestBody, Long.parseLong(userId));
        return ResponseEntity.ok(new SingleResponseDto<>(response));

    }
    
    @PatchMapping("/{commentId}")
    public ResponseEntity patchComment(@Positive @PathVariable("communityId") long communityId,
                                       @Positive @PathVariable("commentId") long commentId,
                                       @Valid @RequestBody CommentDto.Patch requestBody,
                                       @RequestHeader("Authorization") String token) {

        String userId = jwtTokenizer.getUsername(token);
        CommentDto.PatchResponse response = commentService.updateComment(communityId, requestBody, Long.parseLong(userId));
        return ResponseEntity.ok(new SingleResponseDto<>(response));

    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity deleteComment(@Positive @PathVariable("commentId") long commentId,
                                        @RequestHeader("Authorization") String token) {

        String userId = jwtTokenizer.getUsername(token);
        commentService.deleteComment(commentId, Long.parseLong(userId));
        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }



}
