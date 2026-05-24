package com.example.backend.user.dto.request;

import com.example.backend.user.entity.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Schema(description = "Datos para peticiones de usuarios")
public class UserRequest {
    @Schema(description = "Nombre del usuario", example = "María Soledad Rodriguez")
    @NotBlank(message = "El nombre es obligatorio")
    private String name;
    @Schema(description = "Contraseña del usuario", example = "password123")
    @NotBlank(message = "La contraseña es obligatoria")
    private String password;
    @Schema(description = "Email del usuario", example = "soledad@gmail.com")
    @Email(message = "Email inválido")
    @NotBlank(message = "El email es obligatorio")
    private String email;
    @Schema(description = "Rol del usuario", example = "USER")
    @NotBlank(message = "El rol es obligatorio")
    private Role role;
}
