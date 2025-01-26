package com.nit.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Role {

    @Id
    private Integer id;

    @Column(unique = true, nullable = false)
    private String name;
    
}
