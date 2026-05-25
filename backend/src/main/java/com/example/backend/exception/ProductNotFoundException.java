package com.example.backend.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(Long id) {
        super("Producto con id " + id + " no encontrado");
    }
}
