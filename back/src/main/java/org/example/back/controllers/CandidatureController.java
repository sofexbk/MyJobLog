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
@RequiredArgsConstructor
public class CandidatureController {

    private final DefaultCandidatureProcessor processor;
    private final CandidatureService service;


    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(@PathVariable Long id, @RequestParam String status) {
        service.updateStatus(id, status);
        return ResponseEntity.ok("Status updated");
    }
}
