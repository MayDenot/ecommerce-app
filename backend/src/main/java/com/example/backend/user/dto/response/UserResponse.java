package com.example.backend.user.dto.response;

import com.example.backend.user.entity.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Schema(description = "Datos para respuestas de usuarios")
public class UserResponse {
    @Schema(description = "ID del usuario", example = "1")
    private Long id;
    @Schema(description = "Nombre del usuario", example = "Juan")
    private String name;
    @Schema(description = "Email del usuario", example = "juan@example.com")
    private String email;
    @Schema(description = "Rol del usuario", example = "USER")
    private Role role;
}
