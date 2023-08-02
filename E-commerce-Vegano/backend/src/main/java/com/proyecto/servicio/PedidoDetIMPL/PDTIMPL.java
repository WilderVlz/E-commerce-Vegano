package com.proyecto.servicio.PedidoDetIMPL;

import com.proyecto.entidades.PedidoDetalle;
import com.proyecto.repositorio.PedidoDRepositorio;
import com.proyecto.servicio.PedidoDetalleServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PDTIMPL implements PedidoDetalleServ {

    @Autowired
    private PedidoDRepositorio pedidoDRepositorio;
    @Override
    public List<PedidoDetalle> listaDePedidoD() {
        return (List<PedidoDetalle>) this.pedidoDRepositorio.findAll();
    }

    @Override
    public PedidoDetalle crearPedidoDetalle(PedidoDetalle pedidoDetalle) {
        pedidoDetalle.setSubTotal(pedidoDetalle.getSubTotal());

        return this.pedidoDRepositorio.save(pedidoDetalle);
    }

    @Override
    public PedidoDetalle modificarPedidoDetalle(PedidoDetalle pedidoDetalle) {
        return this.pedidoDRepositorio.save(pedidoDetalle);
    }

    @Override
    public PedidoDetalle consultarPedidoDetalle(int id) {
        return this.pedidoDRepositorio.findById(id).get();
    }

    @Override
    public void eliminarPedidoDetalle(int id) {

        this.pedidoDRepositorio.deleteById(id);

    }
}
