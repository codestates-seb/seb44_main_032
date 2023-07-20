package com.codeassembly.exception;

import lombok.Getter;

public enum ExceptionCode {
    USER_NOT_FOUND(404, "User not found"),
    USER_EXISTS(409, "Already User exists"),
    UNMATCHED_WRITER(403, "글 작성자가 아닙니다."),
    UNAUTHORIZED(403, "권한이 없습니다."),
    UNMATCHED_COMMUNITY_WRITER(403, "커뮤니티 작성자가 아닙니다."),
    COMMUNITY_NOT_FOUND(404, "Community not found"),
    PLAN_NOT_FOUND(404, "Plan not found"),
    UNMATCHED_COMMENT_WRITER(403, "댓글 작성자가 아닙니다."),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    CATEGORY_NOT_FOUND(404, "Category not found")


    ;

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}

