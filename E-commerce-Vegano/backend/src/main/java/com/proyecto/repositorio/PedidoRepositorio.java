package com.proyecto.repositorio;

import com.proyecto.entidades.Pedido;
import org.springframework.data.repository.CrudRepository;

public interface PedidoRepositorio extends CrudRepository<Pedido,Integer> {
}
