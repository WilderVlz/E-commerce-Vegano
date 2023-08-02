package com.proyecto.config;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.stereotype.Component;

import com.proyecto.filters.JWTAuthenticationFilter;
import com.proyecto.util.JWTUtils;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JWTHTTPConfigurer extends AbstractHttpConfigurer<JWTHTTPConfigurer, HttpSecurity> {
	
	private final JWTUtils jwtUtils;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        final AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
        http
        	//.antMatcher(Constants.LOGIN_URL)
        	.authorizeHttpRequests(a -> a.requestMatchers("/auth/**").permitAll().anyRequest().authenticated())
        	.addFilter(new JWTAuthenticationFilter(authenticationManager, jwtUtils));
    }



}
