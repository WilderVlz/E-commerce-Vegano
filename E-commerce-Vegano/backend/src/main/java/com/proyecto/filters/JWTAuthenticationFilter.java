
package com.proyecto.filters;

import java.io.IOException;
import java.util.ArrayList;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyecto.constans.Constants;
import com.proyecto.entidades.Usuario;
import com.proyecto.util.JWTUtils;


public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	
	private JWTUtils jwtUtils;

	private AuthenticationManager authenticationManager;

	public JWTAuthenticationFilter(AuthenticationManager authenticationManager, JWTUtils jwtUtils) {
		this.authenticationManager = authenticationManager;
		this.jwtUtils=jwtUtils;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {

		try {

			System.out.println("usuario json " + request.getInputStream());

			Usuario usuario = new ObjectMapper().readValue(request.getInputStream(), Usuario.class);

			System.out.println("usuario " + usuario);

			UsernamePasswordAuthenticationToken upat = new UsernamePasswordAuthenticationToken(usuario.getUsuario(),
					usuario.getContrasena(), new ArrayList<>());

			System.out.println("upat" + upat);

			Authentication aut = authenticationManager.authenticate(upat);

			// System.out.println("aut "+aut);

			return aut;

		} catch (IOException e) {
			System.out.println("attemptAuthentication " + e.getMessage());
			throw new RuntimeException(e);
		}
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication auth) throws IOException, ServletException {

		/*
		byte signingKey[] = Constants.SUPER_SECRET_KEY.getBytes();

		
		String token = Jwts.builder().setIssuedAt(new Date()).setIssuer(Constants.ISSUER_INFO)
				.setSubject(((UserDetailsImpl) auth.getPrincipal()).getUsername())
				.setExpiration(new Date(System.currentTimeMillis() + Constants.TOKEN_EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS512, signingKey).compact();
		*/
		String token = jwtUtils.generateJwtToken(auth);
		
		/*
		Jwts.builder().setSubject((userPrincipal.getUsername())).setIssuedAt(new Date())
		.setExpiration(new Date((new Date()).getTime() + Constants.TOKEN_EXPIRATION_TIME))
		.signWith(SignatureAlgorithm.HS512, Constants.SUPER_SECRET_KEY).compact();
		*/

		System.out.println("token " + token);

		response.addHeader("Access-Control-Expose-Headers", "Authorization");

		response.addHeader(Constants.HEADER_AUTHORIZACION_KEY, Constants.TOKEN_BEARER_PREFIX + " " + token);

	}

}
