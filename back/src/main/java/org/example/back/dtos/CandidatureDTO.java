package org.example.back.dtos;

import java.time.LocalDate;

public class CandidatureDTO {
    private Long id;
    private String title;
    private String company;
    private String status;
    private String link;
    private String note;
    private LocalDate dateApplied;

    public CandidatureDTO() {}

    public CandidatureDTO(Long id, String title, String company, String status,
                          String link, String note, LocalDate dateApplied) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.status = status;
        this.link = link;
        this.note = note;
        this.dateApplied = dateApplied;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public LocalDate getDateApplied() { return dateApplied; }
    public void setDateApplied(LocalDate dateApplied) { this.dateApplied = dateApplied; }
}
