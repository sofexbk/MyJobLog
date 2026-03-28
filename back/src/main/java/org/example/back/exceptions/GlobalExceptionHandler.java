package org.example.back.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class GlobalExceptionHandler {
    @ExceptionHandler(CandidatureNotFoundException.class)
    public ResponseEntity<String> handle(CandidatureNotFoundException e) {
        return ResponseEntity.notFound().build();
    }
}
