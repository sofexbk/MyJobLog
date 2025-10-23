package org.example.back.dtos;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.example.back.enums.Role;

@Data
@Setter
@Getter
public class UserDTO {
    private Long id;
    private String email;
    private Role role;
}