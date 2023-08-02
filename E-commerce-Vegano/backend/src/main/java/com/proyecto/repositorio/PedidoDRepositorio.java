package com.proyecto.repositorio;

import com.proyecto.entidades.PedidoDetalle;
import org.springframework.data.repository.CrudRepository;

public interface PedidoDRepositorio extends CrudRepository<PedidoDetalle,Integer> {
}
