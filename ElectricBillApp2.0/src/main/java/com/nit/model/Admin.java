package com.nit.model;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Table(name = "Admin")
public class Admin implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "admin_seq_gen")
    @SequenceGenerator(name = "admin_seq_gen", sequenceName = "admin_sequence", allocationSize = 1)
    private Integer id;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 100)
    private String address;

    @Column(nullable = false)
    private Long phoneNo;

    @Nonnull
    @Column(nullable = false, unique = true)
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="admin_role", joinColumns = @JoinColumn(name="admin",referencedColumnName = "id"))
    private Set<Role> roles=new HashSet<>();
}