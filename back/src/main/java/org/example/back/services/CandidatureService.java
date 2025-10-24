package org.example.back.services;

import org.example.back.events.CandidatureObserver;
import org.example.back.enums.Status;
import org.example.back.models.Candidature;
import org.example.back.models.User;
import org.example.back.repositories.CandidatureRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class CandidatureService {

    private final CandidatureRepository repo;
    private final List<CandidatureObserver> observers = new ArrayList<>();

    public CandidatureService(CandidatureRepository repo) {
        this.repo = repo;
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

    public Candidature create(Candidature c, User user) {
        c.setUser(user);
        c.setDateApplied(LocalDate.now());
        c.setStatus(Status.ENVOYÉ);
        return repo.save(c);
    }

    public List<Candidature> findByUser(User user) {
        return repo.findByUser(user);
    }

    public List<Candidature> findAll() {
        return repo.findAll();
    }

    public Candidature update(Long id, Candidature newData, User user) {
        Candidature c = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidature not found"));
        if (!c.getUser().equals(user))
            throw new RuntimeException("Not authorized to update this candidature");

        c.setTitle(newData.getTitle());
        c.setCompany(newData.getCompany());
        c.setLink(newData.getLink());
        c.setNote(newData.getNote());
        c.setStatus(newData.getStatus());
        return repo.save(c);
    }

    public void delete(Long id, User user) {
        Candidature c = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidature not found"));
        if (!c.getUser().equals(user))
            throw new RuntimeException("Not authorized to delete this candidature");
        repo.delete(c);
    }

}
