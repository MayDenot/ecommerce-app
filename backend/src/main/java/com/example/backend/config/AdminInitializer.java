package com.example.backend.config;

import com.example.backend.user.entity.Role;
import com.example.backend.user.entity.User;
import com.example.backend.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {
    private static final Logger logger =
            LoggerFactory.getLogger(AdminInitializer.class);

    @Bean
    CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            boolean adminExists = userRepository.existsByRole(Role.ADMIN);

            if (!adminExists) {
                User admin = new User();

                admin.setName("Admin");
                admin.setEmail("admin@gmail.com");

                admin.setPassword(
                        passwordEncoder.encode("admin123")
                );

                admin.setRole(Role.ADMIN);

                userRepository.save(admin);

                logger.info("Admin creado correctamente");
            }
        };
    }
}