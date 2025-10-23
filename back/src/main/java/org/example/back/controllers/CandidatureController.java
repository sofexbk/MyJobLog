package org.example.back.controllers;

import lombok.RequiredArgsConstructor;
import org.example.back.dtos.CandidatureDTO;
import org.example.back.models.User;
import org.example.back.services.CandidatureService;
import org.example.back.strategy.DefaultCandidatureProcessor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/candidatures")
public class CandidatureController {

    private final DefaultCandidatureProcessor processor;
    private final CandidatureService service;

    public CandidatureController( CandidatureService service, DefaultCandidatureProcessor processor) {
        this.service = service;
        this.processor = processor;
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(@PathVariable Long id, @RequestParam String status) {
        service.updateStatus(id, status);
        return ResponseEntity.ok("Status updated");
    }
}
