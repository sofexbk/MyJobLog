package org.example.back.mappers;

import org.example.back.dtos.CandidatureDTO;
import org.example.back.models.Candidature;
import org.springframework.stereotype.Component;

@Component
public class CandidatureMapper {

    public Candidature toEntity(CandidatureDTO dto) {
        Candidature c = new Candidature();
        c.setTitle(dto.getTitle());
        c.setCompany(dto.getCompany());
        c.setLink(dto.getLink());
        c.setNote(dto.getNote());
        return c;
    }

    public CandidatureDTO toDTO(Candidature c) {
        CandidatureDTO dto = new CandidatureDTO();
        dto.setId(c.getId());
        dto.setTitle(c.getTitle());
        dto.setCompany(c.getCompany());
        dto.setStatus(String.valueOf(c.getStatus()));
        dto.setLink(c.getLink());
        dto.setNote(c.getNote());
        dto.setDateApplied(c.getDateApplied());
        return dto;
    }
}
