package com.example.backend.auth.controller;

import com.example.backend.auth.dto.request.LoginRequest;
import com.example.backend.auth.dto.request.RefreshTokenRequest;
import com.example.backend.auth.dto.request.RegisterRequest;
import com.example.backend.auth.service.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticación", description = "Endpoints para registro e inicio de sesión")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(RegisterRequest dto) {
        return ResponseEntity.ok(authService.register(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(LoginRequest dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(RefreshTokenRequest dto) {
        return ResponseEntity.ok(authService.refreshToken(dto));
    }
}
