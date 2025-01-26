package com.nit.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nit.model.ApplicantRegister;

@Repository
public interface ApplicantRepository extends JpaRepository<ApplicantRegister, Integer> {

	public boolean existsByEmail(String email);
	
	public Optional<ApplicantRegister> findByEmail(String email);
}
