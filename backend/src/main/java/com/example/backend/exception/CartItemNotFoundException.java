package com.example.backend.exception;

public class CartItemNotFoundException extends RuntimeException {
    public CartItemNotFoundException(Long idCartItem) {
        super("No se encontro el item con id " + idCartItem);
    }
}
