package com.example.backend.cart.mapper;

import com.example.backend.cart.dto.request.CartRequest;
import com.example.backend.cart.dto.response.CartItemResponse;
import com.example.backend.cart.dto.response.CartResponse;
import com.example.backend.cart.entity.Cart;
import com.example.backend.cart.entity.CartItem;

import java.util.List;

public class CartMapper {
    public static Cart toEntity(CartRequest cartRequest) {
        Cart cart = new Cart();

        cart.setUser(cartRequest.getUser());
        cart.setCartItems(cartRequest.getCartItems());
        cart.setTotalPrice(cartRequest.getTotalPrice());

        return cart;
    }

    public static CartResponse toResponse(Cart cart) {
        List<CartItemResponse> items =
                cart.getCartItems()
                        .stream()
                        .map(CartMapper::toCartItemResponse)
                        .toList();

        return new CartResponse(
                cart.getId(),
                items,
                cart.getTotalPrice()
        );
    }

    public static CartItemResponse toCartItemResponse(CartItem item) {
        return new CartItemResponse(
                item.getId(),
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getProduct().getImage(),
                item.getUnitPrice(),
                item.getQuantity(),
                item.getSubtotal()
        );
    }
}
