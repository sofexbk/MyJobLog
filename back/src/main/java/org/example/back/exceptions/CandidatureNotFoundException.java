package org.example.back.exceptions;

public class CandidatureNotFoundException extends RuntimeException {
    public CandidatureNotFoundException(String message) {
        super(message);
    }
}
