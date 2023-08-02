package com.proyecto.repositorio;

import org.springframework.data.repository.CrudRepository;

import com.proyecto.entidades.AuthorityEntity;

public interface AuthorityRepositorio extends CrudRepository<AuthorityEntity, Integer> {

}
