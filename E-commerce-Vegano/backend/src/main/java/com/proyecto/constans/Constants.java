package com.proyecto.constans;

import javax.crypto.SecretKey;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

public class Constants {
  
//Spring Security
 public static final String HEADER_AUTHORIZACION_KEY 	= "Authorization";
 public static final String TOKEN_BEARER_PREFIX 		= "Bearer ";
 public static final String AUTHORITIES					=  "authorities";

 // JWT

 public static final String ISSUER_INFO = "http://www.example.com/";
 
 //public static final SecretKey KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);
 
 public static final String SUPER_SECRET_KEY = "kr1dT1FeLsWVL8Mnm9s4jM3qsRTYXPR3VIRrBF0gr94xBWM9bUBFswmVtSSFCz3dpoRjLgCmzTxpMvvsWU/21w==";
		 
 public static final SecretKey KEY = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SUPER_SECRET_KEY));
 
 public static final long TOKEN_EXPIRATION_TIME = 86_400_000;
 
}
