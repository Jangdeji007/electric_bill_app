package com.nit.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nit.config.AppConfig;
import com.nit.exception.AllReadyCreated;
import com.nit.exception.UserNotFoundException;
import com.nit.model.Address;
import com.nit.model.ApplicantRegister;
import com.nit.model.Documents;
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
	private final String uploadDir = "uploads/";
	
	public ApplicantRegister creatApplicat(ApplicantRegister appReg)
	{
		if(userRepo.existsByEmail(appReg.getEmail())) {
			throw new AllReadyCreated("User allReady created");
		}
		
		appReg.setPassword(passEncode.encode(appReg.getPassword()));
		Role role = roleRepo.findById(2).get();
		appReg.getRoles().add(role);
		ApplicantRegister save = userRepo.save(appReg);
		return save;
	}
	
	public ApplicantRegister getUser(String email)
	{
		ApplicantRegister byUserId =userRepo.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found for this email Id: " + email));
		return byUserId;
	}
	
	public ApplicantRegister saveOrUpdateApplicant(ApplicantRegister applicant,MultipartFile aadhaarFile,MultipartFile  rashanCardFile,MultipartFile  photoFile)
	throws IOException{
		ApplicantRegister existUser =userRepo.findByEmail(applicant.getEmail())
               
				.orElseThrow(() -> new UserNotFoundException("User not found for this email Id: " + applicant.getEmail()));
	    // Add or update documents
	    if (aadhaarFile != null && !aadhaarFile.isEmpty()) {
	        addOrUpdateDocument(existUser, aadhaarFile, "Aadhaar Card");
	    }
	    if (rashanCardFile != null && !rashanCardFile.isEmpty()) {
	        addOrUpdateDocument(existUser, rashanCardFile, "Rashan Card");
	    }
	    if (photoFile != null && !photoFile.isEmpty()) {
	        addOrUpdateDocument(existUser, photoFile, "Applicant Photo");
	    }
	        existUser.setTitle(applicant.getTitle());
	        existUser.setConnectionType(applicant.getConnectionType());
	        existUser.setFirstName(applicant.getFirstName());
	        existUser.setLastName(applicant.getLastName());
	        existUser.setDob(applicant.getDob());
	        existUser.setAadhaarCardNo(applicant.getAadhaarCardNo());
	        existUser.setConnectionType(applicant.getConnectionType());
	        existUser.setGender(applicant.getGender());
	        existUser.setCategory(applicant.getCategory());
	        existUser.setStatus(applicant.getStatus());
	        existUser.setAddress(applicant.getAddress());
	        return userRepo.save(existUser);
	    }

	// Helper method to add or update documents
	private void addOrUpdateDocument(ApplicantRegister applicant, MultipartFile file, String documentName) throws IOException {
	    Documents document = new Documents();
	    document.setName(file.getOriginalFilename());
	    document.setType(file.getContentType());
	    document.setContent(file.getBytes());
	    document.setApplicantRegister(applicant);
	    applicant.getDocuments().add(document);
	}
	    
	    public ApplicantRegister saveOrUpdateAddress(Address addr, String email)
	    {
	    	ApplicantRegister byEmail = userRepo.findByEmail(email).orElseThrow(()-> new UserNotFoundException("User not found for this email Id: " + email));
	    	byEmail.setAddress(addr);
	    	ApplicantRegister save = userRepo.save(byEmail);
	    	
	    	return save;
	    }
	
	
}
