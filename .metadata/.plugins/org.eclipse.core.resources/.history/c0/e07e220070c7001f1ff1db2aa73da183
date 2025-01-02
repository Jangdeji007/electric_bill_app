package com.nit.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ApplicantRegister implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "applicant_seq_gen")
    @SequenceGenerator(name = "applicant_seq_gen", sequenceName = "applicant_sequence", allocationSize = 1)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String userId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    private String connectionType;

    @Column(nullable = false, unique = true)
    private Long mobile;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
    }

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="applicant_role", joinColumns = @JoinColumn(name="applicant_register",referencedColumnName = "id"))
    @ToString.Exclude
    private Set<Role> roles= new HashSet<Role>();
}
