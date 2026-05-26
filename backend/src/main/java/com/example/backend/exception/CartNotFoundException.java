package com.example.backend.exception;

public class CartNotFoundException extends RuntimeException {
    public CartNotFoundException(Long cartId) {
        super("Carrito de compras no encontrado con id " + cartId);
    }

    public CartNotFoundException(String email) {
        super("Carrito de compras no encontrado con email del usuario " + email);
    }
}
