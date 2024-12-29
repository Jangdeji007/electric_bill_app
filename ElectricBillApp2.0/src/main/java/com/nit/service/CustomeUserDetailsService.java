package com.nit.service;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nit.model.Admin;
import com.nit.model.ApplicantRegister;
import com.nit.repository.AdminRepository;
import com.nit.repository.ApplicantRepository;

@Service
public class CustomeUserDetailsService implements UserDetailsService {

	@Autowired
	AdminRepository admiRepo;
	
	@Autowired
	ApplicantRepository appRepo;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
	Optional<Admin> admin= admiRepo.findByEmail(username);
		if(admin.isPresent())
		{
			return new User(
	                admin.get().getEmail(),
	                admin.get().getPassword(),
	                admin.get().getRoles().stream()
	                    .map(role -> new SimpleGrantedAuthority(role.getName()))
	                    .collect(Collectors.toList())
	            );
		}
		
		Optional<ApplicantRegister> applicant= appRepo.findByUserId(username);
		if(applicant.isPresent())
		{
			return new User(
					applicant.get().getUserId(),
					applicant.get().getPassword(),
					applicant.get().getRoles().stream()
					.map(role -> new SimpleGrantedAuthority(role.getName()))
                    .collect(Collectors.toList())
					);
		}
		throw new UsernameNotFoundException("User not found "+username);
	}
	
	

}