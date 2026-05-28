package com.example.backend.cart.dto.request;

import com.example.backend.cart.entity.CartItem;
import com.example.backend.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "Request para crear o modificar un carrito")
public class CartRequest {
    @Schema(description = "Usuario dueño del carrito")
    @NotNull(message = "El usuario del carrito es obligatorio")
    private User user;

    @Schema(description = "Lista de items del carrito")
    private List<CartItem> cartItems = new ArrayList<>();

    @Schema(description = "Precio total del carrito", example = "199.99")
    private BigDecimal totalPrice;
}
