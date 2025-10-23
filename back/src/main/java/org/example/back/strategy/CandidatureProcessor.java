package org.example.back.strategy;

import org.example.back.dtos.CandidatureDTO;
import org.example.back.models.Candidature;
import org.example.back.models.User;

public abstract class CandidatureProcessor {

    public final void process(CandidatureDTO dto, User user) {
        validate(dto);
        Candidature candidature = mapToEntity(dto, user);
        save(candidature);
        notify(candidature);
    }

    protected abstract void validate(CandidatureDTO dto);
    protected abstract Candidature mapToEntity(CandidatureDTO dto, User user);
    protected abstract void save(Candidature candidature);
    protected abstract void notify(Candidature candidature);
}
