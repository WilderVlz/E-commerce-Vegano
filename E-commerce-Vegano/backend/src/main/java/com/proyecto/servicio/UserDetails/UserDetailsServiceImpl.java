package com.proyecto.servicio.UserDetails;

import static java.util.Objects.*;

import org.springframework.beans.factory.annotation.Autowired;

/* Spring Security	*/
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

import com.proyecto.entidades.Usuario;
import com.proyecto.repositorio.UsuarioRepositorio;


@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	
	@Autowired
	private UsuarioRepositorio usuarioRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		return getUserDetail(username);
	
	}
	
	
	private Usuario getUserEntity(String usuario) {
		Usuario usuarioEntity= this.usuarioRepository.findByUsuario(usuario);
		
		if (isNull(usuarioEntity)) {
			throw new UsernameNotFoundException("Usuario no existe");
		}
		
		return usuarioEntity;
	}
	
	public UserDetailsImpl getUserDetail(String username) {
		Usuario usuarioEntity = getUserEntity(username);
			
		return new UserDetailsImpl(usuarioEntity);
	}
	
	public boolean esUsuarioRegistrado(String usuario) {
		Usuario usuarioEntity= this.usuarioRepository.findByUsuario(usuario);
		
		if (!isNull(usuarioEntity)) {
			return true;
		}
		
		return false;
	}

}
