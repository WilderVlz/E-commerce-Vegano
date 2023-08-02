package com.proyecto.servicio;

import java.util.List;
import java.util.Optional;

import com.proyecto.entidades.AuthorityEntity;

public interface AuthorityServicio {
	public List<AuthorityEntity> listarRoles();

    public AuthorityEntity crearRol(AuthorityEntity cliente);

    public AuthorityEntity modificarRol(AuthorityEntity cliente);

    public Optional<AuthorityEntity> obtenerRol(Integer id);

    public void eliminarRol(int id);
}
