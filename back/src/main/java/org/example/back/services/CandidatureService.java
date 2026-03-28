package org.example.back.services;

import org.example.back.enums.Role;
import org.example.back.events.CandidatureObserver;
import org.example.back.enums.Status;
import org.example.back.exceptions.CandidatureNotFoundException;
import org.example.back.exceptions.UnauthorizedException;
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
        Candidature c = repo.findById(id).orElseThrow(() -> new CandidatureNotFoundException("Candidature not found"));

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
        c.setStatus(Status.EN_ATTENTE);
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
                .orElseThrow(() -> new CandidatureNotFoundException("Candidature not found"));
        c.setTitle(newData.getTitle());
        c.setCompany(newData.getCompany());
        c.setLink(newData.getLink());
        c.setNote(newData.getNote());
        c.setStatus(newData.getStatus());
        return repo.save(c);
    }

    public void delete(Long id, User user) {
        Candidature c = repo.findById(id)
                .orElseThrow(() -> new CandidatureNotFoundException("Candidature not found"));
        if (!c.getUser().equals(user))
            throw new RuntimeException("Not authorized to delete this candidature");
        repo.delete(c);
    }

    public void updateStatus(Long id, String newStatus, User currentUser) {
        Candidature candidature = repo.findById(id)
                .orElseThrow(() -> new CandidatureNotFoundException("Candidature not found"));

        boolean isOwner = candidature.getUser().getId().equals(currentUser.getId());
        boolean isAdmin = Role.ADMIN.equals(currentUser.getRole());

        if (!isOwner && !isAdmin) {
            throw new UnauthorizedException("Forbidden: You cannot change this status");
        }

        List<Status> allowedStatuses = List.of(Status.ACCEPTE, Status.ENTRETIEN, Status.REFUSE);

        Status statusEnum;
        try {
            statusEnum = Status.valueOf(newStatus.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + newStatus);
        }

        if (!allowedStatuses.contains(statusEnum)) {
            throw new RuntimeException("This status cannot be set manually");
        }

        candidature.setStatus(statusEnum);
        repo.save(candidature);
    }


}
