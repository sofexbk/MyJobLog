package org.example.back.services;

import org.example.back.events.CandidatureObserver;
import org.example.back.enums.Status;
import org.example.back.models.Candidature;
import org.example.back.repositories.CandidatureRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CandidatureService {

    private final CandidatureRepository repo;
    private final List<CandidatureObserver> observers = new ArrayList<>();

    public CandidatureService(CandidatureRepository repo) {
        this.repo = repo;
    }

    public void addObserver(CandidatureObserver observer) {
        observers.add(observer);
    }

    public void updateStatus(Long id, String status) {
        Candidature c = repo.findById(id).orElseThrow(() -> new RuntimeException("Candidature not found"));

        Status newStatus;
        try {
            newStatus = Status.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status);
        }

        c.setStatus(newStatus);
        repo.save(c);

        observers.forEach(o -> o.onStatusChanged(c));
    }

    public List<Candidature> findAll() {
        return repo.findAll();
    }

    public Candidature save(Candidature c) {
        return repo.save(c);
    }
}
