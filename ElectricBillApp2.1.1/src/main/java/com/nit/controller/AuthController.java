package com.nit.controller;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nit.model.JwtRequest;
import com.nit.model.JwtResponse;
import com.nit.security.JwtHelper;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private JwtHelper helper;

	private Logger logger = LoggerFactory.getLogger(AuthController.class);

	@PostMapping("/login")
	public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

	    this.doAuthenticate(request.getEmail(), request.getPassword());

	    // Load user details
	    UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
	    String token = this.helper.generateToken(userDetails);

	    // Extract roles from GrantedAuthority
	    Set<String> roles = userDetails.getAuthorities()
	                                   .stream()
	                                   .map(GrantedAuthority::getAuthority)
	                                   .collect(Collectors.toSet());

	    // Build and return the JwtResponse
	    JwtResponse response = JwtResponse.builder()
	                                       .jwtToken(token)
	                                       .email(userDetails.getUsername())
	                                       .roles(roles)
	                                       .build();

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	

	private void doAuthenticate(String username, String password) {

		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, password);
		try {
			manager.authenticate(authentication);

		} catch (BadCredentialsException e) {
			throw new BadCredentialsException(" Invalid Username or Password  !!");
		}

	}

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Object> handleBadCredentialsException(BadCredentialsException ex) {
        // Build the JSON response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .body(Map.of(
                                 "status", "failed",
                                 "message", "Invalid username or password"
                             ));
    }

}
