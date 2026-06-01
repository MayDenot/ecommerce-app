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
    private Long id;

    private String name;

    private String description;

    private String image;
}
