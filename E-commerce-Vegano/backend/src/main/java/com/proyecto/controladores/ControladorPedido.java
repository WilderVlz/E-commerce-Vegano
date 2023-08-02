package com.proyecto.controladores;

import com.proyecto.entidades.Pedido;
import com.proyecto.servicio.pedidoServIMPL.PDIMPL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("VeggieDelivery")
public class ControladorPedido {

    @Autowired
    private PDIMPL pdimpl;

    @GetMapping
    @RequestMapping(value = "listaDePedidos", method = RequestMethod.GET)
    public ResponseEntity<?> listaPedidos(){

        List<Pedido> listaDePedidos = this.pdimpl.listaDePedidos();

        return ResponseEntity.ok(listaDePedidos);

    }

    @PostMapping
    @RequestMapping(value = "crearPedido", method = RequestMethod.POST)
    public ResponseEntity<?> crearPedido(@RequestBody Pedido pedido){

        Pedido pedidoCreado = this.pdimpl.crearPedido(pedido);

        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoCreado);

    }

    @PutMapping
    @RequestMapping(value = "modificarPedido", method = RequestMethod.PUT)
    public ResponseEntity<?> modificarPedido(@RequestBody Pedido pedido){

        Pedido pedidoModificado = this.pdimpl.modificarPedido(pedido);

        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoModificado);
    }

    @GetMapping
    @RequestMapping(value = "consultarPedido/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> consultarPedido(@PathVariable int id){

        Pedido pedido = this.pdimpl.consultarPedido(id);

        return ResponseEntity.ok(pedido);

    }

    @DeleteMapping
    @RequestMapping(value = "eliminarPedido/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> eliminarPedido(@PathVariable int id){

        this.pdimpl.eliminarPedido(id);

        return ResponseEntity.ok().build();

    }
}
