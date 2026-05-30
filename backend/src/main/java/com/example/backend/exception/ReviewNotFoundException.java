package com.example.backend.exception;

public class ReviewNotFoundException extends RuntimeException {
    public ReviewNotFoundException(Long reviewId) {
        super("Review no encontrada con id " + reviewId);
    }
}
