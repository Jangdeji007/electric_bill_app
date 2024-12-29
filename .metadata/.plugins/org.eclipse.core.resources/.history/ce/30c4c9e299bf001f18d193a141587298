package com.nit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nit.model.Admin;
import com.nit.repository.AdminRepository;

@Service
public class AdminService {

	@Autowired
	AdminRepository AdminRepo;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	public Admin createAdmin(Admin Admin)
	{
		Admin.setPassword(passwordEncoder.encode(Admin.getPassword()));
		Admin save = AdminRepo.save(Admin);
		return save;
	}
	public List<Admin> AdminDetails()
	{
		List<Admin> all = AdminRepo.findAll();
		return all;
	}
}
