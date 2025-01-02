package com.nit.model;

import java.io.Serializable;
import java.util.Collection;

import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Component
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@jakarta.persistence.Table(name="Admin")
public class Admin implements Serializable, UserDetails{
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "my_seq_gen")
	@SequenceGenerator(name = "my_seq_gen", sequenceName = "my_sequence", allocationSize = 1)
	private Integer adminid;
	@Column(length=100)
    private String password;
	@Column(length=12)
    private String adminroll;
	@Column(length=50)
    private String name;
	@Column(length=100)
    private String address;
	@Column(length=12)
    private Long phoneNo;
	@Nonnull
    private String email;
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.email;
	}
}
