package com.nit.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nit.config.AppConfig;
import com.nit.exception.UserNotFoundException;
import com.nit.model.ApplicantRegister;
import com.nit.model.Role;
import com.nit.repository.ApplicantRepository;
import com.nit.repository.RoleRepository;

@Service
public class ApplicantRegiService {

	@Autowired
	private ApplicantRepository userRepo;
	@Autowired
	private PasswordEncoder passEncode;
	
	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
	AppConfig app;
	
	public ApplicantRegister creatApplicat(ApplicantRegister appReg)
	{
		if(userRepo.existsByUserId(appReg.getUserId())) {
			throw new IllegalArgumentException("User allReady created");
		}
		
		appReg.setPassword(passEncode.encode(appReg.getPassword()));
		Role role = roleRepo.findById(2).get();
		appReg.getRoles().add(role);
		ApplicantRegister save = userRepo.save(appReg);
		return save;
	}
	
	public ApplicantRegister getUser(String id)
	{
		ApplicantRegister byUserId =userRepo.findByUserId(id)
                .orElseThrow(() -> new UserNotFoundException("User not found for id: " + id));
		return byUserId;
	}
	
	
}
