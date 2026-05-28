package com.example.backend.cart.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Schema(description = "Item individual dentro del carrito")
public class CartItemResponse {
    @Schema(description = "ID del item", example = "1")
    private Long id;

    @Schema(description = "ID del producto", example = "5")
    private Long productId;

    @Schema(description = "Nombre del producto", example = "Auriculares Bluetooth")
    private String productName;

    @Schema(description = "URL de la imagen del producto")
    private String image;

    @Schema(description = "Precio unitario", example = "59.99")
    private BigDecimal unitPrice;

    @Schema(description = "Cantidad", example = "2")
    private Integer quantity;

    @Schema(description = "Subtotal del item", example = "119.98")
    private BigDecimal subtotal;
}
