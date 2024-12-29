package com.nit.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nit.model.Admin;
import com.nit.service.AdminService;
@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminService admin;
	@GetMapping("/getDetails")
	public ResponseEntity<List<Admin>> home()
	{
		 return new ResponseEntity<List<Admin>>(admin.AdminDetails(), HttpStatus.OK);
	}
	@GetMapping("/aaa")
	public String userName(Principal principal)
	{
		return principal.toString();
	}
}