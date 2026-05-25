package com.example.backend.user.service;

import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.exception.InvalidPasswordException;
import com.example.backend.exception.SamePasswordException;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.user.dto.request.UpdateUserRequest;
import com.example.backend.user.dto.request.UserRequest;
import com.example.backend.user.dto.response.UserResponse;
import com.example.backend.user.entity.User;
import com.example.backend.user.mapper.UserMapper;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.user.specification.UserSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public Page<UserResponse> findAll(String name, String email, String role, Pageable pageable) {
        Specification<User> spec = Specification
                .where(UserSpecification.hasName(name))
                .or(UserSpecification.hasEmail(email))
                .or(UserSpecification.hasRole(role));

        return userRepository.findAll(spec, pageable)
                .map(UserMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public UserResponse findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return UserMapper.toResponse(user);
    }

    @Transactional
    public UserResponse save(UserRequest dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new EmailAlreadyExistsException(dto.getEmail());
        }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());

        userRepository.save(user);
        return UserMapper.toResponse(user);
    }

    @Transactional
    public UserResponse update(Long id, UpdateUserRequest dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());

        userRepository.save(user);
        return UserMapper.toResponse(user);
    }

    @Transactional
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id); // 404
        }
        userRepository.deleteById(id);
    }

    @Transactional
    public void changePassword(String email, String currentPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new InvalidPasswordException();
        }

        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new SamePasswordException();
        }

        user.setPassword(passwordEncoder.encode(newPassword));
    }

    @Transactional(readOnly = true)
    public UserResponse findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));
        return UserMapper.toResponse(user);
    }
}
