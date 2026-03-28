package org.example.back.strategy;

import org.example.back.dtos.CandidatureDTO;
import org.example.back.enums.Status;
import org.example.back.mappers.CandidatureMapper;
import org.example.back.models.Candidature;
import org.example.back.models.User;
import org.example.back.repositories.CandidatureRepository;
import org.example.back.services.NotificationService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DefaultCandidatureProcessor extends CandidatureProcessor {

    private final CandidatureRepository repo;
    private final NotificationService notificationService;
    private final CandidatureMapper mapper;

    public DefaultCandidatureProcessor(CandidatureRepository repo, NotificationService notificationService, CandidatureMapper mapper) {
        this.repo = repo;
        this.notificationService = notificationService;
        this.mapper = mapper;
    }

    @Override
    protected void validate(CandidatureDTO dto) {
        if (dto.getTitle() == null || dto.getCompany() == null)
            throw new IllegalArgumentException("Title and company are required");
    }

    @Override
    protected Candidature mapToEntity(CandidatureDTO dto, User user) {
        Candidature candidature = mapper.toEntity(dto);
        candidature.setUser(user);
        candidature.setDateApplied(LocalDate.now());
        candidature.setStatus(Status.EN_ATTENTE);
        return candidature;
    }

    @Override
    protected void save(Candidature candidature) {
        repo.save(candidature);
    }

    @Override
    protected void notify(Candidature candidature) {
        notificationService.notifyUser(candidature.getUser().getEmail(),
                "Candidature envoyée à " + candidature.getCompany());
    }
}
