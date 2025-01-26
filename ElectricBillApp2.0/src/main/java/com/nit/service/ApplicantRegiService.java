package com.nit.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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

	public ApplicantRegister creatApplicat(ApplicantRegister appReg) {
		if (userRepo.existsByEmail(appReg.getEmail())) {
			throw new AllReadyCreated("User allReady created");
		}

		appReg.setPassword(passEncode.encode(appReg.getPassword()));
		Role role = roleRepo.findById(2).get();
		appReg.getRoles().add(role);
		ApplicantRegister save = userRepo.save(appReg);
		return save;
	}

	public ApplicantRegister getUser(String email) {
		ApplicantRegister byUserId = userRepo.findByEmail(email)
				.orElseThrow(() -> new UserNotFoundException("User not found for this email Id: " + email));
		return byUserId;
	}

	public ApplicantRegister saveOrUpdateApplicant(ApplicantRegister applicant, MultipartFile aadhaarFile,
			MultipartFile rashanCardFile, MultipartFile photoFile) throws IOException {
		ApplicantRegister existUser = userRepo.findByEmail(applicant.getEmail())

				.orElseThrow(
						() -> new UserNotFoundException("User not found for this email Id: " + applicant.getEmail()));
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
		return userRepo.save(existUser);
	}

	// Helper method to add or update documents
	private void addOrUpdateDocument(ApplicantRegister applicant, MultipartFile file, String documentName)
	        throws IOException {
	    Documents existingDocument = applicant.getDocuments().stream()
	        .filter(doc -> doc.getName().equals(documentName))
	        .findFirst()
	        .orElseThrow(() -> new UserNotFoundException("User not found for this email Id: " +applicant.getEmail() ));

	    if (existingDocument != null) {
	    	existingDocument.setName(documentName);
	        existingDocument.setContent(file.getBytes());
	        existingDocument.setType(file.getContentType());
	        existingDocument.setApplicantRegister(applicant);
	        applicant.getDocuments().add(existingDocument);
	    } else {
	        Documents newDocument = new Documents();
	        newDocument.setName(documentName);
	        newDocument.setType(file.getContentType());
	        newDocument.setContent(file.getBytes());
	        newDocument.setApplicantRegister(applicant);
	        applicant.getDocuments().add(newDocument);
	    }
	}
	
	
	
	
	
	
	public ApplicantRegister saveOrUpdateAddress(Address address, String email) {
		ApplicantRegister applicant = userRepo.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found for this email Id: " + email));

		if (applicant != null) {
			if (applicant.getAddress() != null) {
				// Update existing address
				Address existingAddress = applicant.getAddress();
				existingAddress.setAddress(address.getAddress());
				existingAddress.setHousePlotPremiseNo(address.getHousePlotPremiseNo());
				existingAddress.setAreaColony(address.getAreaColony());
				existingAddress.setBlock(address.getBlock());
				existingAddress.setDistrict(address.getDistrict());
				existingAddress.setPincode(address.getPincode());
				existingAddress.setStreet(address.getStreet());
				existingAddress.setTownVillage(address.getTownVillage());
				
				
				// Update other address fields as necessary...
				ApplicantRegister save = userRepo.save(applicant); // This will cascade to address due to
																	// CascadeType.ALL
				return save;
			} else {
				// Set new address to applicant and save
				applicant.setAddress(address);
				ApplicantRegister save = userRepo.save(applicant);
				return save;
			}
		} else {
			throw new RuntimeException("Applicant not found for ID: " + email);
		}
	}
	
	public ApplicantRegister saveUpdateTerm(String term, String email)
	{
		ApplicantRegister app1 = userRepo.findByEmail(email).orElseThrow(()->new UserNotFoundException("User not found for this email Id: " + email));
		app1.setStatus(term);
		app1.setFormStatus("pending");
		String registerId= app1.getConnectionType().substring(0,3).toUpperCase().concat(app1.getId().toString());
		app1.setRegisterId(registerId);
		return userRepo.save(app1);
	}
	
	public Map<String,Object> checkFormStatus(String regId)
	{
		ApplicantRegister user = userRepo.findByRegisterId(regId).orElseThrow(()->new UserNotFoundException("User Register ID not found"+regId));
		String name= user.getTitle()+" "+user.getFirstName()+" "+user.getLastName();
		Map<String,Object> map= new HashMap<>();
		map.put("id",user.getId());
		map.put("name", name);
		map.put("registerId", regId);
		map.put("formSubmitDate", user.getCreatedDate());
		map.put("email", user.getEmail());
		map.put("status",user.getFormStatus() );
		
		return map;
		
	}
}
