package com.example.backend.review.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Schema(description = "Datos de las reseñas en respuestas")
public class ReviewResponse {
    private Long id;

    private String username;

    private Integer rating;

    private String comment;

    private LocalDateTime createdAt;
}
