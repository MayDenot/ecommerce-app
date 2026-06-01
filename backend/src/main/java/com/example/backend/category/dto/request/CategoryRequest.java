package com.example.backend.category.dto.request;

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
@Schema(description = "Datos para la peticion de una categoría")
public class CategoryRequest {
    @Schema(description = "Nombre de la categoria", example = "Tecnologia")
    @NotBlank(message = "El nombre de la categoria es obligatorio")
    private String name;

    @Schema(description = "Descripción de la categoria", example = "Tecnologia y accesorios")
    @NotBlank(message = "La descripción de la categoria es obligatoria")
    private String description;

    @NotBlank(message = "La imagen es obligatoria")
    private String image;
}
