package org.example.back.events;

import org.example.back.models.Candidature;

public interface CandidatureObserver {
    void onStatusChanged(Candidature candidature);
}