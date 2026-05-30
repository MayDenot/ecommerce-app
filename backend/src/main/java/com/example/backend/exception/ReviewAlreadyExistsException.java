package com.example.backend.exception;

public class ReviewAlreadyExistsException extends RuntimeException {
    public ReviewAlreadyExistsException() {
        super("La reseña ya existe");
    }
}
