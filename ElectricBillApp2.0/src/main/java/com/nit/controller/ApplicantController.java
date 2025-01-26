package com.nit.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.nit.model.Address;
import com.nit.model.ApplicantRegister;
import com.nit.model.Documents;
import com.nit.service.ApplicantRegiService;

@RestController
@RequestMapping("/applicant")
public class ApplicantController {
	
	@Autowired
	ApplicantRegiService appService;
	
	@GetMapping("/details")
	public ResponseEntity<Map<String,Object>> applicantLogin(@RequestParam("email") String email)
	{
		
	System.err.println(email);
		ApplicantRegister user = appService.getUser(email);
		Map<String, Object> details= new HashMap<>();
		details.put("title", user.getTitle());
		details.put("gender", user.getGender());
		details.put("category", user.getCategory());
		details.put("dob", user.getDob());
		details.put("userId", user.getUserId());
		details.put("email", user.getEmail());
		details.put("connectionType", user.getConnectionType());
		details.put("mobile", user.getMobile());
		details.put("firstName", user.getFirstName());
		details.put("lastName", user.getLastName());
		details.put("aadhaarCardNo", user.getAadhaarCardNo());
		details.put("address", user.getAddress());
		details.put("status", user.getStatus());
		
	    List<Map<String, String>> documentDetails = new ArrayList<>();
	    for (Documents document : user.getDocuments()) {
	        Map<String, String> doc = new HashMap<>();
	        doc.put("name", document.getName());
	        doc.put("type", document.getType());
	        doc.put("content", Base64.getEncoder().encodeToString(document.getContent())); // Encode content as Base64
	        documentDetails.add(doc);
	    }
	    details.put("documents", documentDetails);

	    System.out.println(details);
		System.out.println(details);
		return new ResponseEntity<>(details, HttpStatus.OK);
	}
	
	@PostMapping("/save")
	public ResponseEntity<?> saveDetails( @RequestPart(value = "applicant", required = false) String applicant,
			@RequestPart(value = "aadhaarFile", required = false) MultipartFile aadhaarFile,
			@RequestPart(value = "rashanCardFile", required = false) MultipartFile rashanCardFile,
			@RequestPart(value = "photoFile", required = false) MultipartFile photoFile) {
        try {
            System.out.println("Applicant JSON: " + applicant);

            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            ApplicantRegister savedApplicant = mapper.readValue(applicant, ApplicantRegister.class);
        	ApplicantRegister applicantData = appService.saveOrUpdateApplicant(savedApplicant, aadhaarFile, rashanCardFile, photoFile);
            return new ResponseEntity<>(applicantData, HttpStatus.CREATED);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving applicant: " + e.getMessage());
        }
    }
	
	@PostMapping("/saveAddress")
	public ResponseEntity<ApplicantRegister> saveAddress(@RequestBody Address address, @RequestParam("email") String email)
	{
		System.out.println(address);
		ApplicantRegister saveOrUpdateAddress = appService.saveOrUpdateAddress(address, email);
		return new ResponseEntity<ApplicantRegister>(saveOrUpdateAddress, HttpStatus.CREATED);
	}
	
	@PostMapping("/termCondition")
	public ResponseEntity<?> saveUpdateTermCondition(@RequestBody String term, @RequestParam("email") String email)
	{
		ApplicantRegister saveUpdateTerm = appService.saveUpdateTerm(term, email);
		Map<String, String> data= new HashMap<>();
		data.put("registerId", saveUpdateTerm.getRegisterId());
		return new ResponseEntity<>(data, HttpStatus.OK);
	}
}
