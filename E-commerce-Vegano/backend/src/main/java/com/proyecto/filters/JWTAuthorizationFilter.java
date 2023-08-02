package com.proyecto.filters;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.proyecto.util.JWTUtils;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;

@Slf4j
@Component
@RequiredArgsConstructor
public class JWTAuthorizationFilter extends OncePerRequestFilter {
	
	@Autowired
	private JWTUtils jwtUtils;
	
	/*
	public JWTAuthorizationFilter(UserDetailsService userDetailsService, JWTUtils jwtUtils) {
		super();
		this.userDetailsService = userDetailsService;
		this.jwtUtils = jwtUtils;
	}
	*/

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		System.out.println("headerAuth1 1=>" +  request.getHeader("Authorization"));
		
		if (request.getServletPath().contains("/auth")) {
		    filterChain.doFilter(request, response);
		    return;
		}
		

		try {
			
			String jwt = parseJwt(request);
			
			if (jwt != null && jwtUtils.validateJwtToken(jwt).isValid()) {
				//String username = jwtUtils.getUserNameFromJwtToken(jwt);
				
				Claims claims = jwtUtils.getClaims(jwt);

				//UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				
				@SuppressWarnings("unchecked")
				List<String> authorities = claims.get("authorities", List.class);

			    // Crear una colección de GrantedAuthority a partir de los authorities obtenidos
			    Collection<? extends GrantedAuthority> grantedAuthorities = authorities.stream()
			            .map(SimpleGrantedAuthority::new)
			            .collect(Collectors.toList());
				
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						//userDetails, null, userDetails.getAuthorities());
						claims.getSubject(), null, grantedAuthorities);
				
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(authentication);
			}

		} catch (Exception e) {
			log.error("Cannot set user authentication: {}", e);
		}
		

		filterChain.doFilter(request, response);
	}

	private String parseJwt(HttpServletRequest request) {
		String headerAuth = request.getHeader("Authorization");
		if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
			return headerAuth.substring(7, headerAuth.length());
		}
		return null;
	}
}