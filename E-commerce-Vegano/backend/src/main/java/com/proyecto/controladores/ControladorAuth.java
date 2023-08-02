package com.proyecto.controladores;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.entidades.AuthorityEntity;
import com.proyecto.entidades.Cliente;
import com.proyecto.entidades.Usuario;
import com.proyecto.servicio.AuthorityServIMPL.AuthorityServImpl;
import com.proyecto.servicio.ClienteServIMPL.CIMPL;
import com.proyecto.servicio.UserDetails.UserDetailsImpl;
import com.proyecto.servicio.UserDetails.UserDetailsServiceImpl;
import com.proyecto.servicio.UsuarioServIMPL.USIMPL;
import com.proyecto.util.JWTUtils;
import com.proyecto.util.request.AuthenticationRequest;
import com.proyecto.util.request.RegisterRequest;
import com.proyecto.util.response.AuthenticationResponse;
import com.proyecto.util.response.ValidateTokenResponse;

@RestController
@RequestMapping(value = "/auth")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST })
public class ControladorAuth {

	private AuthenticationManager authenticationManager;

	//private UserDetailsService userDetailsServiceImpl;
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	private CIMPL cimpl;
	
	private USIMPL usimpl;
	
	private AuthorityServImpl authorityServImpl;
	
	private JWTUtils jWTUtils;

	public ControladorAuth(AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsServiceImpl, 
			JWTUtils jWTUtils, CIMPL cimpl, USIMPL usimpl, AuthorityServImpl authorityServImpl) {
		this.authenticationManager = authenticationManager;
		this.userDetailsServiceImpl = userDetailsServiceImpl;
		this.jWTUtils = jWTUtils;
		this.cimpl = cimpl;
		this.usimpl = usimpl;
		this.authorityServImpl = authorityServImpl;
	}
	  
	  
	  //private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	  

	  @PostMapping("/authenticate")
	  public AuthenticationResponse authenticate(@RequestBody AuthenticationRequest authenticationReq) {
		  
	    authenticationManager.authenticate(
	        new UsernamePasswordAuthenticationToken(authenticationReq.getUsuario(),
	            authenticationReq.getContrasena()));
	    
	    //final UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(
	        //authenticationReq.getUsername());
	    
	    final UserDetailsImpl userDetails = userDetailsServiceImpl.getUserDetail(authenticationReq.getUsuario());
	    
	    final String jwt = jWTUtils.generateJwtToken(userDetails);

	    return  AuthenticationResponse.builder()
	    		  .codeStatus(HttpStatus.OK.value())
	    		  .message("OK")
	    		  .accessToken(jwt)
	    		  .build();
	 
	  }
	  
	  @PostMapping("/refresh-token")
	  public AuthenticationResponse refreshToken(@RequestHeader("Authorization") String authorization) {
		  
		  if (!StringUtils.hasText(authorization) || !authorization.startsWith("Bearer ")) {
			  return  AuthenticationResponse.builder()
		    		  .codeStatus(HttpStatus.BAD_REQUEST.value())
		    		  .message("Empty JWT token")
		    		  .build();
		  }
		  
		  String tokenRequest = authorization.substring(7);
		  //String tokenRequest headerAuth.substring(7, headerAuth.length());
		  
		  ValidateTokenResponse vt = jWTUtils.validateJwtToken(tokenRequest);
		  
		  if (tokenRequest == null || !vt.isValid()) {
			  return  AuthenticationResponse.builder()
		    		  .codeStatus(HttpStatus.BAD_REQUEST.value())
		    		  .message(vt.isValid()? "JWT token is null": vt.getMessage())
		    		  .build();
		  }
		  
		  final String username = jWTUtils.getUserNameFromJwtToken(tokenRequest);
		  
		  final UserDetailsImpl userDetails = userDetailsServiceImpl.getUserDetail(username);
		  
		  final String jwtRefresh = jWTUtils.generateJwtToken(userDetails);
	       
	      return AuthenticationResponse.builder()
	    		  .codeStatus(HttpStatus.OK.value())
	    		  .message("OK")
	    		  .refreshToken(jwtRefresh)
	    		  .build();
	  }
	  
	  @PostMapping("/register")
	  public AuthenticationResponse register(@RequestBody RegisterRequest registerReq) {
	    
	    final boolean esUsuarioRegistrado = userDetailsServiceImpl.esUsuarioRegistrado(registerReq.getUsuario());
	    
	    if(esUsuarioRegistrado) {
	    	return AuthenticationResponse.builder()
		    		  .codeStatus(HttpStatus.BAD_REQUEST.value())
		    		  .message("Este usuario ya está registrado.")
		    		  .build();
	    }
	    
	    if(registerReq.getIdRol() == null) {
	    	return  AuthenticationResponse.builder()
		    		  .codeStatus(HttpStatus.BAD_REQUEST.value())
		    		  .message("El rol es requerido.")
		    		  .build(); 
	    }
	    
	    Set<AuthorityEntity> s = new HashSet<>();
	    
	    Optional<AuthorityEntity> optAuthority = authorityServImpl.obtenerRol(registerReq.getIdRol());
	    
	    if(optAuthority.isPresent()) {
	    	s.add(optAuthority.get());
	    }else {
	    	return  AuthenticationResponse.builder()
		    		  .codeStatus(HttpStatus.BAD_REQUEST.value())
		    		  .message("El rol ingresado no existe.")
		    		  .build(); 
	    }
	    
	    Cliente c = new Cliente();
	    c.setNombre(registerReq.getNombre());
	    c.setApellido(registerReq.getApellido());
	    c.setEmail(registerReq.getEmail());
	    c.setNumeroCelular(registerReq.getNumeroCelular());
	    
	    cimpl.crearCliente(c);
	    
	    Usuario u = new Usuario();
	    
	    u.setUsuario(registerReq.getUsuario());
	    u.setContrasena(new BCryptPasswordEncoder().encode(registerReq.getContrasena()));
	    u.setCliente(c);
	    
	    u.setAuthorities(s);
	    
	    usimpl.crearUsuario(u);
	    
	    return AuthenticationResponse.builder()
	    		  .codeStatus(HttpStatus.OK.value())
	    		  .message("Usuario creado correctamente.")
	    		  .build(); 		 
	 
	  }
}
