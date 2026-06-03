package com.example.backend.order.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
@Schema(description = "Datos para realizar una compra inmediata")
public class BuyNowRequest {

    @Schema(
            description = "ID del producto a comprar",
            example = "1"
    )
    @NotNull
    private Long productId;

    @Schema(
            description = "Cantidad a comprar",
            example = "2"
    )
    @NotNull
    @Positive
    private Integer quantity;
}