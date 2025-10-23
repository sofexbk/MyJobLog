package org.example.back.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Setter
@Getter
public class CandidatureDTO {
    private Long id;
    private String title;
    private String company;
    private String status;
    private String link;
    private String note;
    private LocalDate dateApplied;
}