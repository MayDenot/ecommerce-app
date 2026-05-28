package com.example.backend.cart.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Schema(description = "Respuesta del carrito con sus items y total")
public class CartResponse {
    @Schema(description = "ID del carrito", example = "1")
    private Long id;

    @Schema(description = "Lista de items en el carrito")
    private List<CartItemResponse> items;

    @Schema(description = "Precio total del carrito", example = "199.99")
    private BigDecimal totalPrice;
}