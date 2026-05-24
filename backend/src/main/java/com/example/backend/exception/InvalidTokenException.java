package com.example.backend.exception;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException() {
        super("Refresh token inválido");
    }
}
