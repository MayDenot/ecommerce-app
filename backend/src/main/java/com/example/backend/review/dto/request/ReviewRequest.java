package com.example.backend.review.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Schema(description = "Datos de las reseñas en peticiones")
public class ReviewRequest {
    @Min(1)
    @Max(5)
    private Integer rating;

    @NotBlank
    private String comment;
}
