package com.example.backend.user.dto.request;

import com.example.backend.user.entity.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Schema(description = "DTO para que el admin actualice un usuario")
public class UpdateUserRequest {
    @Schema(description = "Nombre del usuario", example = "Juan")
    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @Schema(description = "Email del usuario", example = "juan@example.com")
    @Email(message = "Email inválido")
    @NotBlank(message = "El email es obligatorio")
    private String email;

    @Schema(description = "Rol del usuario", example = "USER")
    @NotNull(message = "El rol es obligatorio")
    private Role role;
}
