package com.example.backend.cart.repository;

import com.example.backend.cart.entity.Cart;
import com.example.backend.cart.entity.CartItem;
import com.example.backend.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
}
