package org.example.back.models;

import jakarta.persistence.*;
import org.example.back.enums.Status;

import java.time.LocalDate;

@Entity
@Table(name = "candidatures")
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String company;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String link;
    private String note;
    private LocalDate dateApplied;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Candidature() {}

    public Candidature(Long id, String title, String company, Status status,
                       String link, String note, LocalDate dateApplied, User user) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.status = status;
        this.link = link;
        this.note = note;
        this.dateApplied = dateApplied;
        this.user = user;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public LocalDate getDateApplied() { return dateApplied; }
    public void setDateApplied(LocalDate dateApplied) { this.dateApplied = dateApplied; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String title;
        private String company;
        private Status status;
        private String link;
        private String note;
        private LocalDate dateApplied;
        private User user;

        public Builder title(String title) { this.title = title; return this; }
        public Builder company(String company) { this.company = company; return this; }
        public Builder status(Status status) { this.status = status; return this; }
        public Builder link(String link) { this.link = link; return this; }
        public Builder note(String note) { this.note = note; return this; }
        public Builder dateApplied(LocalDate dateApplied) { this.dateApplied = dateApplied; return this; }
        public Builder user(User user) { this.user = user; return this; }

        public Candidature build() {
            Candidature c = new Candidature();
            c.setTitle(title);
            c.setCompany(company);
            c.setStatus(status);
            c.setLink(link);
            c.setNote(note);
            c.setDateApplied(dateApplied);
            c.setUser(user);
            return c;
        }
    }
}
