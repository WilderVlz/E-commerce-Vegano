package com.proyecto.repositorio;

import com.proyecto.entidades.Plato;
import org.springframework.data.repository.CrudRepository;

public interface PlatoRepositorio extends CrudRepository<Plato,Integer> {
}
