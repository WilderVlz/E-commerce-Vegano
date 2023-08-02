package com.proyecto.util;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.proyecto.constans.Constants;
import com.proyecto.servicio.UserDetails.UserDetailsImpl;
import com.proyecto.util.response.ValidateTokenResponse;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JWTUtils {
	
	// ****************** Authentication ***************************

	public String generateJwtToken(Authentication authentication) {

		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
		
		return generateToken(userPrincipal);
		 
	}
	
	public String generateJwtToken(UserDetailsImpl userPrincipal) {
		return generateToken(userPrincipal);
	}
	
	private String generateToken(UserDetailsImpl userPrincipal) {
		
		Claims claims = getClaims(userPrincipal);
		
		String tk2 = Jwts.builder()
				//.setIssuedAt(new Date()).setIssuer(Constants.ISSUER_INFO)
				//.setSubject(userPrincipal.getUsername())
				.setClaims(claims)
				.setExpiration(new Date(System.currentTimeMillis() + Constants.TOKEN_EXPIRATION_TIME))
				//.claim(Constants.AUTHORITIES, authoritiesItems)
				//.signWith(SignatureAlgorithm.HS512, Constants.SUPER_SECRET_KEY).compact();
				.signWith(Constants.KEY).compact();
		
		System.out.println("tk2 -> "+tk2);
		return tk2;
	}
	
	private Claims getClaims(UserDetailsImpl userPrincipal) {
		Collection<? extends GrantedAuthority> authorities=userPrincipal.getAuthorities();

		Collection<?> authoritiesItems= authorities.stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());
		
		Claims claims = Jwts.claims()
				.setSubject(userPrincipal.getUsername())
				.setIssuedAt(new Date())
				.setIssuer(Constants.ISSUER_INFO);
		
        claims.put(Constants.AUTHORITIES, authoritiesItems);
        claims.put("firstname", userPrincipal.getFirstname());
        claims.put("lastname", userPrincipal.getLastname());
        claims.put("isActive", userPrincipal.isEnabled());
        
        return claims;
	}
	
	// ******************** Authorization ********************************
	
	public Claims getClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(Constants.KEY).build().parseClaimsJws(token).getBody();
	}
	
	public String getUserNameFromJwtToken(String token) {
		//return Jwts.parser().setSigningKey(Constants.SUPER_SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
		
		//List<String> list = Jwts.parserBuilder().setSigningKey(Constants.KEY).build().parseClaimsJws(token).getBody().get("authorities", List.class);
		
		//System.out.println("list =>" + list);
		
		return getClaims(token).getSubject();
	}
	
	
	// Authentication y Authorization

	public ValidateTokenResponse validateJwtToken(String authToken) {
		System.out.println("ENTRANDO A authToken "+authToken);
		
		ValidateTokenResponse vt = ValidateTokenResponse.builder()
		.isValid(false).build();
		
		try {
			//Jwts.parser().setSigningKey(Constants.SUPER_SECRET_KEY).parseClaimsJws(authToken);
			Jwts.parserBuilder().setSigningKey(Constants.KEY).build().parseClaimsJws(authToken);
			return ValidateTokenResponse.builder()
					.isValid(true).build();
		} catch (SignatureException e) {
			log.error("Invalid JWT signature: {}", e.getMessage());
			vt.setMessage("Invalid JWT signature: " + e.getMessage());
			
		} catch (MalformedJwtException e) {
			log.error("Invalid JWT token: {}", e.getMessage());
			vt.setMessage("Invalid JWT token: " + e.getMessage());
			
		} catch (ExpiredJwtException e) {
			log.error("JWT token is expired: {}", e.getMessage());
			vt.setMessage("JWT token is expired: " + e.getMessage());
			
		} catch (UnsupportedJwtException e) {
			log.error("JWT token is unsupported: {}", e.getMessage());
			vt.setMessage("JWT token is unsupported: " + e.getMessage());
			
		} catch (IllegalArgumentException e) {
			log.error("JWT claims string is empty: {}", e.getMessage());
			vt.setMessage("JWT claims string is empty: " + e.getMessage());
		}

		return vt;
	}
	
	
}