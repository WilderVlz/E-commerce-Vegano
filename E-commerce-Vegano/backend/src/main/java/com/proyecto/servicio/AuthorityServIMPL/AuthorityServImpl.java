package com.proyecto.servicio.AuthorityServIMPL;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto.entidades.AuthorityEntity;
import com.proyecto.repositorio.AuthorityRepositorio;
import com.proyecto.servicio.AuthorityServicio;

@Service
public class AuthorityServImpl implements AuthorityServicio {
	
	private AuthorityRepositorio repositorio;

	public AuthorityServImpl(AuthorityRepositorio repositorio) {
		this.repositorio = repositorio;
	}

	@Override
	public List<AuthorityEntity> listarRoles() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AuthorityEntity crearRol(AuthorityEntity cliente) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AuthorityEntity modificarRol(AuthorityEntity cliente) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<AuthorityEntity> obtenerRol(Integer id) {
		return this.repositorio.findById(id);
	}

	@Override
	public void eliminarRol(int id) {
		// TODO Auto-generated method stub
		
	}

}
