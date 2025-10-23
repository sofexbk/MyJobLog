package org.example.back.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.back.enums.Status;

import java.time.LocalDate;

@Entity
@Table(name = "candidatures")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Candidature {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String company;
    @Enumerated(EnumType.STRING)
    private Status status;    private String link;
    private String note;
    private LocalDate dateApplied;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
