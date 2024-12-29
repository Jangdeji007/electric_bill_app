package com.nit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nit.model.Admin;
import com.nit.model.ApplicantRegister;
import com.nit.service.AdminService;
import com.nit.service.ApplicantRegiService;

@RestController
@RequestMapping("/public")
public class PublicController {

	@Autowired
	AdminService adminService;
	@Autowired
	private ApplicantRegiService appService;

	@PostMapping("/create-user")
	public ResponseEntity<Admin> createUser(@RequestBody Admin user) {
		Admin user2 = adminService.createAdmin(user);

		return new ResponseEntity<>(user2, HttpStatus.CREATED);
	}

	@PostMapping("/register")
	public ResponseEntity<ApplicantRegister> registerApplicant(@RequestBody ApplicantRegister applicant) {
		ApplicantRegister creatApplicat = appService.creatApplicat(applicant);

		return new ResponseEntity<ApplicantRegister>(creatApplicat, HttpStatus.CREATED);
	}

}
