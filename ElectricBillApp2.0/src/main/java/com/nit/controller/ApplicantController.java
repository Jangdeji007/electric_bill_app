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
	
	@PostMapping("/getDetails")
	public ResponseEntity<Map<String,Object>> applicantLogin(@RequestBody Map<String, String> id)
	{
		String email= id.get("email");
	System.err.println(email);
		ApplicantRegister user = appService.getUser(email);
		Map<String, Object> details= new HashMap<>();
		details.put("userId", user.getUserId());
		details.put("email", user.getEmail());
		details.put("connectionType", user.getConnectionType());
		details.put("mobile", user.getMobile());
		details.put("firstName", user.getFirstName());
		details.put("lastName", user.getLastName());
		details.put("aadhaarCardNo", user.getAadhaarCardNo());
		details.put("address", user.getAddress());
		details.put("aadhaarCardPhoto", user.getAadhaarCardPhoto());
		details.put("rashanCardPhoto", user.getRashanCardPhoto());
		details.put("applicantPhoto", user.getApplicantPhoto());
		details.put("termCondition", user.getStatus());
		return new ResponseEntity<>(details, HttpStatus.OK);
	}
}
