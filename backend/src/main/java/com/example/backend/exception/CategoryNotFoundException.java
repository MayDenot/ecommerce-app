package com.example.backend.exception;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(Long id) {
        super("Categoría con id " + id + " no encontrado");
    }

    public CategoryNotFoundException(String name) {
        super("Categoría con name " + name + " no encontrado");
    }
}
