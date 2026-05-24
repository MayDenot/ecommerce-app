package com.example.backend.exception;

public class SamePasswordException extends RuntimeException {
    public SamePasswordException() {
        super("La nueva contraseña no puede ser igual a la actual");
    }
}
