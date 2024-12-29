package com.nit.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.nit.security.JwtAuthenticationEntryPoint;
import com.nit.security.JwtAuthenticationFilter;
import com.nit.service.CustomeUserDetailsService;

@Configuration
public class SecurityConfig {

	@Autowired
	CustomeUserDetailsService userDeatilsService;

	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	private JwtAuthenticationEntryPoint point;
	@Autowired
	private JwtAuthenticationFilter filter;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors(cors -> cors.configurationSource(request -> {
			CorsConfiguration config = new CorsConfiguration();
			config.setAllowedOrigins(List.of("http://localhost:4200"));
			config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
			config.setAllowedHeaders(List.of("*"));
			config.setAllowCredentials(true);
			return config;
		})).csrf(csrf -> csrf.disable())
				.authorizeRequests(auth -> auth.requestMatchers("/public/**").permitAll()
						.requestMatchers("/auth/**").permitAll()
						.requestMatchers("/admin/**").hasRole("ADMIN") // Adjust as necessary
						.requestMatchers("/applicant/**").hasRole("USER")
						.anyRequest().authenticated())
				.exceptionHandling(ex -> ex.authenticationEntryPoint(point))
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public DaoAuthenticationProvider doDoaAuthenticationProvider() {
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
		daoAuthenticationProvider.setUserDetailsService(userDeatilsService);
		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
		
		return daoAuthenticationProvider;

	}

}