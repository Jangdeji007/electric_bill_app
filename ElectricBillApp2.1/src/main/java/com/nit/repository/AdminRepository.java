package com.nit.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nit.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

	public Optional<Admin> findByEmail(String email);
}
