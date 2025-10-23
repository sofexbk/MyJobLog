package org.example.back.dtos;

import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor @AllArgsConstructor
public class AuthRequest {
    private String email;
    private String password;

}
