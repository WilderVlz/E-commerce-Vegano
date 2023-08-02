package com.proyecto.repositorio;

import com.proyecto.entidades.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepositorio extends JpaRepository<Usuario,Integer> {
	
	Usuario findByUsuario(String usuario);
	
}
