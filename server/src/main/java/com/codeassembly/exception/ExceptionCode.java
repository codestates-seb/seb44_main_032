package com.codeassembly.exception;

import lombok.Getter;

public enum ExceptionCode {
    USER_NOT_FOUND(404, "User not found"),
    USER_EXISTS(409, "Already User exists"),
    UNMATCHED_WRITER(403, "글 작성자가 아닙니다."),
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

