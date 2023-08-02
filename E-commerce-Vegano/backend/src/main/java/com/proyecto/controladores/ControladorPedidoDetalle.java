package com.proyecto.controladores;

import com.proyecto.entidades.PedidoDetalle;
import com.proyecto.servicio.PedidoDetIMPL.PDTIMPL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("VeggieDelivery")
public class ControladorPedidoDetalle {

    @Autowired
    private PDTIMPL pdtimpl;

    @GetMapping
    @RequestMapping(value = "listaDePedidoDetalle", method = RequestMethod.GET)
    public ResponseEntity<?> listaPedidoDetalle(){

        List<PedidoDetalle> listaDePedidoDet = this.pdtimpl.listaDePedidoD();

        return ResponseEntity.ok(listaDePedidoDet);

    }

    @PostMapping
    @RequestMapping(value = "crearPedidoDetalle", method = RequestMethod.POST)
    public ResponseEntity<?> crearPedidoDetalle(@RequestBody PedidoDetalle pedidoDetalle){

        PedidoDetalle pedidoDCreado = this.pdtimpl.crearPedidoDetalle(pedidoDetalle);

        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoDCreado);

    }

    @PutMapping
    @RequestMapping(value = "modificarPedidoDetalle", method = RequestMethod.PUT)
    public ResponseEntity<?> modificarPedidoDetalle(@RequestBody PedidoDetalle pedidoDetalle) {

        PedidoDetalle pedidoDetModificado = this.pdtimpl.modificarPedidoDetalle(pedidoDetalle);

        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoDetModificado);

    }

    @GetMapping
    @RequestMapping(value = "consultarPedidoDetalle/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> consultarPedidoDetalle(@PathVariable int id) {

        PedidoDetalle pedido = this.pdtimpl.consultarPedidoDetalle(id);

        return ResponseEntity.ok(pedido);

    }

    @DeleteMapping
    @RequestMapping(value = "eliminarPedidoDetalle/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> eliminarPedidoDetalle(@PathVariable int id){

        this.pdtimpl.eliminarPedidoDetalle(id);

        return ResponseEntity.ok().build();

    }
}
