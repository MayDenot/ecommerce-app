package com.example.backend.exception;

public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(Integer stock) {
        super("No hay stock suficiente " + stock);
    }
}
