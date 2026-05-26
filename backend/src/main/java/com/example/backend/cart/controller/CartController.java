package com.example.backend.cart.controller;

import com.example.backend.cart.dto.response.CartResponse;
import com.example.backend.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(@PathVariable Long userId, @PathVariable Long productId,
                                                  @PathVariable Integer quantity) {
        return ResponseEntity.ok(cartService.add(userId, productId, quantity));
    }

    @GetMapping()
    public ResponseEntity<CartResponse> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(cartService.getCart(email));
    }

    @PatchMapping("/items/{idCartItem}")
    public ResponseEntity<?> changeQuantity(@PathVariable Long idCartItem,
                                            @PathVariable Integer quantity) {
        return ResponseEntity.ok(cartService.changeQuantity(idCartItem, quantity));
    }

    @DeleteMapping("/items/{idCartItem}")
    public ResponseEntity<?> delete(@PathVariable Long idCartItem) {
        return ResponseEntity.ok(cartService.delete(idCartItem));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(@PathVariable Long cartId) {
        return ResponseEntity.ok(cartService.clearCart(cartId));
    }
}
