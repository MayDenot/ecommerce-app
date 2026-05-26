package com.example.backend.cart.dto.request;

import com.example.backend.cart.entity.CartItem;
import com.example.backend.user.entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CartRequest {
    @NotNull(message = "El usuario del carrito es obligatorio")
    private User user;
    private List<CartItem> cartItems = new ArrayList<>();
    private BigDecimal totalPrice;
}
