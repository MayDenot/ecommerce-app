package com.example.backend.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super("No se encontro el recurso " + message);
    }
}
