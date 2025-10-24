package org.example.back.controllers;

import org.example.back.dtos.CandidatureDTO;
import org.example.back.mappers.CandidatureMapper;
import org.example.back.models.User;
import org.example.back.services.AuthService;
import org.example.back.services.CandidatureService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/candidatures")
public class CandidatureController {

    private final CandidatureService service;
    private final CandidatureMapper mapper;
    private final AuthService authService ;

    public CandidatureController(CandidatureService service, CandidatureMapper mapper, AuthService authService) {
        this.service = service;
        this.mapper = mapper;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody CandidatureDTO dto) {
        User user = authService.getCurrentUser();
        service.create(mapper.toEntity(dto), user);
        return ResponseEntity.ok("Candidature créée avec succès");
    }

    @GetMapping("/me")
    public List<CandidatureDTO> myCandidatures() {
        User user = authService.getCurrentUser();
        return service.findByUser(user)
                .stream().map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/all")
    public List<CandidatureDTO> all() {
        return service.findAll()
                .stream().map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody CandidatureDTO dto) {
        User user = authService.getCurrentUser();
        service.update(id, mapper.toEntity(dto), user);
        return ResponseEntity.ok("Candidature mise à jour");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        User user = authService.getCurrentUser();
        service.delete(id, user);
        return ResponseEntity.ok("Candidature supprimée");
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        User currentUser = authService.getCurrentUser();
        service.updateStatus(id, status, currentUser);
        return ResponseEntity.ok("Status updated to " + status);
    }

}
