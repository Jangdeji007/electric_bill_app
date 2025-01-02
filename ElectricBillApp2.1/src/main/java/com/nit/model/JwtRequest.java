package com.nit.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
@Builder
@NoArgsConstructor
public class JwtRequest {

	private String email;
	
	private String password;
}
