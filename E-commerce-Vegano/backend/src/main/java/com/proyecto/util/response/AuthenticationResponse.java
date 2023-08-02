package com.proyecto.util.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
	
	private Integer codeStatus;
	
	private String message;
	
	private String accessToken;
  
	private String refreshToken;
}
