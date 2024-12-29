package com.nit.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nit.model.ApplicantRegister;
import com.nit.service.ApplicantRegiService;

@RestController
@RequestMapping("/applicant")
public class ApplicantController {
	
	@Autowired
	ApplicantRegiService appService;
	
	@PostMapping("/login")
	public ResponseEntity<Map<String , Object>> applicantLogin(@RequestBody String userId)
	{
	
		ApplicantRegister user = appService.getUser(userId);
		Map<String , Object> userDetails= new HashMap<>();
		userDetails.put("userId", user.getUserId());
		userDetails.put("email", user.getEmail());
		userDetails.put("mobile", user.getMobile());
		userDetails.put("connectionType", user.getConnectionType());
		return new ResponseEntity<>(userDetails, HttpStatus.OK);
	}
}