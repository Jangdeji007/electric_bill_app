package com.nit.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Documents implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "document_seq_gen")
    @SequenceGenerator(name = "document_seq_gen", sequenceName = "document_sequence", allocationSize = 1)
    private Long id;

    @Column(nullable = false)
    private String name;  // File name

    @Column(nullable = false)
    private String type;  // File type (image/pdf)

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB", nullable = false)
    private byte[] content; // File content (image or pdf as byte array)

    @ManyToOne
    @JoinColumn(name = "applicant_id", nullable = false)
    @JsonIgnore  // Prevent recursive serialization
    private ApplicantRegister applicantRegister;  // Relationship to ApplicantRegister
}


