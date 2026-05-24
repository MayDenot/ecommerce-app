package com.example.backend.auth.service;

import com.example.backend.auth.dto.request.LoginRequest;
import com.example.backend.auth.dto.request.RefreshTokenRequest;
import com.example.backend.auth.dto.request.RegisterRequest;
import com.example.backend.auth.dto.response.AuthResponse;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.exception.InvalidPasswordException;
import com.example.backend.exception.InvalidTokenException;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.security.JwtService;
import com.example.backend.user.entity.Role;
import com.example.backend.user.entity.User;
import com.example.backend.user.mapper.UserMapper;
import com.example.backend.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse register(RegisterRequest dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new EmailAlreadyExistsException(dto.getEmail());
        }

        User user = UserMapper.registerToEntity(dto);

        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        user.setRole(Role.USER);

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        System.out.println(token);

        return AuthResponse.builder()
                .accessToken(token)
                .user(UserMapper.toResponse(user))
                .build();
    }

    @Transactional
    public AuthResponse login(LoginRequest dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new UserNotFoundException(dto.getEmail()));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new InvalidPasswordException();
        }

        String accessToken = jwtService.generateToken(user);

        String refreshToken = jwtService.generateRefreshToken(user);

        return new AuthResponse(
                accessToken,
                refreshToken,
                UserMapper.toResponse(user)
        );

    }

    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest dto) {
        String email = jwtService.extractUsername(dto.getRefreshToken());

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));

        if (!jwtService.isTokenValid(dto.getRefreshToken(), user)) {
            throw new InvalidTokenException();
        }

        String newAccessToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(dto.getRefreshToken())
                .user(UserMapper.toResponse(user))
                .build();
    }
}
