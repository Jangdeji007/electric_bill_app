package com.nit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nit.model.Documents;

public interface DocumentRepository extends JpaRepository<Documents, Integer> {

}
