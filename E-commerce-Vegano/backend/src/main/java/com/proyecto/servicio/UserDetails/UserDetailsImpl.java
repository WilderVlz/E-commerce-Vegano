package com.proyecto.servicio.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import com.proyecto.entidades.Usuario;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class UserDetailsImpl implements UserDetails {

	private static final long serialVersionUID = 1L;
	
	private Usuario userEntity;

	public UserDetailsImpl(Usuario userEntity) {
		this.userEntity = userEntity;
	}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return userEntity.getAuthorities().stream().map(
        			authority -> new SimpleGrantedAuthority(authority.getNombre())
        		).collect(Collectors.toList());
    }
    
	@Override
	public String getPassword() {
		return userEntity.getContrasena();
	}

	@Override
	public String getUsername() {
		return userEntity.getUsuario();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public User getUserDetails() {
		return new User(userEntity.getUsuario(),userEntity.getContrasena(), this.getAuthorities());
	}
	
	public String getFirstname() {
		return userEntity.getCliente().getNombre();
	}
	
	public String getLastname() {
		return userEntity.getCliente().getApellido();
	}


}
