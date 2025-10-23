package org.example.back.events;

import org.example.back.models.Candidature;
import org.example.back.services.NotificationService;
import org.springframework.stereotype.Component;

@Component
public class EmailNotificationObserver implements CandidatureObserver {

    private final NotificationService notificationService;

    public EmailNotificationObserver(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @Override
    public void onStatusChanged(Candidature candidature) {
        String email = candidature.getUser().getEmail();
        String message = "Status for your application to " + candidature.getCompany() +
                " changed to " + candidature.getStatus();
        notificationService.notifyUser(email, message);
    }
}
