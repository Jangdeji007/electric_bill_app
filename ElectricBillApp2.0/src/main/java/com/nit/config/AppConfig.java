package com.nit.config;

import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.nit.model.Admin;
import com.nit.model.ApplicantRegister;
import com.nit.model.Role;
import com.nit.repository.AdminRepository;
import com.nit.repository.ApplicantRepository;
import com.nit.repository.RoleRepository;

@Configuration
public class AppConfig {

//	@Bean
//	public UserDetailsService userDetailsService()
//	{
//		UserDetails userDetails= User.builder().username("karan@gmail.com")
//				.password(passwordEncoder().encode("Pass@123")).roles("ADMIN").build();
//		
//		return new InMemoryUserDetailsManager(userDetails);
//	}
//	
	@Bean
	public PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}
	

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }

}
