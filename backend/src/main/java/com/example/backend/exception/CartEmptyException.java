package com.example.backend.exception;

public class CartEmptyException extends RuntimeException {
    public CartEmptyException() {
        super("El carrito está vacío");
    }
}
