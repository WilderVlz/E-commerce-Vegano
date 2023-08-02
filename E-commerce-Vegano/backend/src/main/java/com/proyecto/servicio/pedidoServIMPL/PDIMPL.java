package com.proyecto.servicio.pedidoServIMPL;

import com.proyecto.entidades.Pedido;
import com.proyecto.repositorio.PedidoRepositorio;
import com.proyecto.servicio.PedidoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PDIMPL implements PedidoServicio {


    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    @Override
    public List<Pedido> listaDePedidos() {
        return (List<Pedido>) this.pedidoRepositorio.findAll();
    }

    @Override
    public Pedido crearPedido(Pedido pedido) {

        pedido.setPagoId(pedido.getPedidoId());

        return this.pedidoRepositorio.save(pedido);
    }

    @Override
    public Pedido modificarPedido(Pedido pedido) {
        return this.pedidoRepositorio.save(pedido);
    }

    @Override
    public Pedido consultarPedido(int id) {
        return this.pedidoRepositorio.findById(id).get();
    }

    @Override
    public void eliminarPedido(int id) {

        this.pedidoRepositorio.deleteById(id);

    }
}
