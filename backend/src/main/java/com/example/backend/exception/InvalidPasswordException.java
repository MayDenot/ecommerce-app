package com.example.backend.exception;

public class InvalidPasswordException extends RuntimeException {
    public InvalidPasswordException() {
        super("Contraseña incorrecta");
    }
}
