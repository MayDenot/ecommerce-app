package com.example.backend.product.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Schema(description = "Datos para la respuesta de un producto")
public class ProductResponse {
    @Schema(description = "ID del producto", example = "1")
    private Long id;

    @Schema(description = "Nombre del producto", example = "Mouse Gamer")
    @NotBlank(message = "El nombre del producto es obligatorio")
    private String name;

    @Schema(description = "Descripción del producto", example = "Mouse gamer RGB inalámbrico")
    @NotBlank(message = "La descripción del producto es obligatoria")
    private String description;

    @Schema(description = "URL de la imagen del producto", example = "https://picsum.photos/300/300")
    @NotBlank(message = "La imagen del producto es obligatoria")
    private String image;

    @Schema(description = "Precio del producto", example = "15000")
    @NotNull(message = "El precio del producto es obligatorio")
    @Positive(message = "El precio debe ser mayor a 0")
    private BigDecimal price;

    @Schema(description = "Stock del producto", example = "5")
    @NotNull(message = "El stock es obligatorio")
    @PositiveOrZero(message = "El stock no puede ser negativo")
    private Integer stock;

    @Schema(description = "ID de la categoría", example = "1")
    @NotNull(message = "La categoría es obligatoria")
    private Long categoryId;

    private Double averageRating;
    private Integer totalReviews;
}
