package com.proyecto.repositorio;

import com.proyecto.entidades.Cliente;
import org.springframework.data.repository.CrudRepository;

public interface ClienteRepositorio extends CrudRepository<Cliente,Integer> {
}
