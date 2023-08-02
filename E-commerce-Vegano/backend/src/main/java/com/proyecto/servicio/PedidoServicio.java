package com.proyecto.servicio;

import com.proyecto.entidades.Pedido;

import java.util.List;

public interface PedidoServicio {

    public List<Pedido> listaDePedidos();

    public Pedido crearPedido(Pedido pedido);

    public Pedido modificarPedido(Pedido pedido);

    public Pedido consultarPedido(int id);

    public void eliminarPedido(int id);

}
