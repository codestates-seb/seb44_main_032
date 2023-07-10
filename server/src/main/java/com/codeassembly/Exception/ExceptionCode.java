package com.codeassembly.Exception;

import lombok.Getter;

public enum ExceptionCode {
    USER_NOT_FOUND(404, "User not found"),
    USER_EXISTS(409, "Already User exists"),
    UNMATCHED_WRITER(403, "스토리 작성자가 아닙니다."),
    COMMUNITY_NOT_FOUND(404, "Community not found")
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

