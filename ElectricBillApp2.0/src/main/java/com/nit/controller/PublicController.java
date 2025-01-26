package com.nit.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nit.model.Admin;
import com.nit.model.ApplicantRegister;
import com.nit.service.AdminService;
import com.nit.service.ApplicantRegiService;
import com.nit.service.CreatePdf;
import com.nit.service.OtpService;

@RestController
@RequestMapping("/public")
public class PublicController {

	@Autowired
	AdminService adminService;
	@Autowired
	private ApplicantRegiService appService;
	@Autowired
	private CreatePdf pdf;

	@PostMapping("/create-admin")
	public ResponseEntity<Admin> createUser(@RequestBody Admin user) {
		Admin user2 = adminService.createAdmin(user);

		return new ResponseEntity<>(user2, HttpStatus.CREATED);
	}

	@PostMapping("/register")
	public ResponseEntity<ApplicantRegister> registerApplicant(@RequestBody ApplicantRegister applicant) {
		ApplicantRegister creatApplicat = appService.creatApplicat(applicant);

		return new ResponseEntity<ApplicantRegister>(creatApplicat, HttpStatus.CREATED);
	}

	@GetMapping("/checkstatus")
	public ResponseEntity<Map<String, Object>> checkStatus(@RequestParam("status") String registerId) {
		Map<String, Object> checkFormStatus = appService.checkFormStatus(registerId);

		return new ResponseEntity<Map<String, Object>>(checkFormStatus, HttpStatus.OK);
	}

	@Autowired
	private OtpService otpService;

	@GetMapping("/send")
	public Map<String, String> sendOtp(@RequestParam("email") String request) {
		otpService.sendOtp(request);
		return Map.of("message", "OTP send Successfully");
	}

	@PostMapping("/verify")
	public Map<String, Boolean> verifyOtp(@RequestBody Map<String, String> request) {
		boolean isValid = otpService.verifyOtp(request.get("email"), request.get("otp"));
		return Map.of("valid", isValid);
	}

	@GetMapping("download")
	public ResponseEntity<byte[]> GeneratePdf(@RequestParam("email") String email) {
		byte[] pdf2 = pdf.generatePdf(email);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_PDF);
		headers.setContentDispositionFormData("filename", "Register_Form.pdf");
		return new ResponseEntity<>(pdf2, headers, HttpStatus.OK);
	}

}
