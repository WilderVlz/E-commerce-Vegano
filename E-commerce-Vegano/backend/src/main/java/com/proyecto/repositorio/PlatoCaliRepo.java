package com.proyecto.repositorio;

import com.proyecto.entidades.Plato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlatoCaliRepo extends JpaRepository<Plato,Long> {

    List<Plato> findAllByCategoriaOrderByPlatoIdAsc(String categoria);
}
