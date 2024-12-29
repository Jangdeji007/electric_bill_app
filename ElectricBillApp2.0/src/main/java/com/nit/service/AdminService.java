package com.nit.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nit.model.Admin;
import com.nit.model.Role;
import com.nit.repository.AdminRepository;
import com.nit.repository.RoleRepository;

@Service
public class AdminService {

	@Autowired
	AdminRepository AdminRepo;
	@Autowired
	RoleRepository roleRepo;
	@Autowired
	PasswordEncoder passwordEncoder;
	
	public Admin createAdmin(Admin admin)
	{
		admin.setPassword(passwordEncoder.encode(admin.getPassword()));
		 Role byId = roleRepo.findById(1).get();
		
		admin.getRoles().add(byId);
		Admin save = AdminRepo.save(admin);
		return save;
	}
	public List<Admin> AdminDetails()
	{
		List<Admin> all = AdminRepo.findAll();
		return all;
	}
}
