package org.example.back.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.example.back.enums.Role;
import org.example.back.models.User;
import org.example.back.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    @PostConstruct
    public void initAdmin() {
        if (repo.findByEmail("admin@myjoblog.com").isEmpty()) {
            User admin = User.builder()
                    .email("admin@myjoblog.com")
                    .password(encoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();

            repo.save(admin);
            System.out.println("✅ Admin inserted: admin@myjoblog.com / admin123");
        }
    }
}
