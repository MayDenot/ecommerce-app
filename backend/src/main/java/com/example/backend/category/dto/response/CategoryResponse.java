package com.example.backend.category.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Schema(description = "Datos para la respuesta de una categoría")
public class CategoryResponse {
    @Schema(description = "ID de la categoria", example = "1")
    private Long id;

    @Schema(description = "Nombre de la categoria", example = "Tecnologia")
    @NotBlank(message = "El nombre de la categoria es obligatorio")
    private String name;

    @Schema(description = "Descripción de la categoria", example = "Tecnologia y accesorios")
    @NotBlank(message = "La descripción de la categoria es obligatoria")
    private String description;
}
