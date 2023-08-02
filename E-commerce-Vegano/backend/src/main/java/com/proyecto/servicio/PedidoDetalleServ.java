package com.proyecto.servicio;

import com.proyecto.entidades.PedidoDetalle;

import java.util.List;

public interface PedidoDetalleServ {

    public List<PedidoDetalle> listaDePedidoD();

    public PedidoDetalle crearPedidoDetalle(PedidoDetalle pedidoDetalle);

    public PedidoDetalle modificarPedidoDetalle(PedidoDetalle pedidoDetalle);

    public PedidoDetalle consultarPedidoDetalle(int id);

    public void eliminarPedidoDetalle(int id);

}
