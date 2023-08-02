package com.proyecto.controladores;

import com.proyecto.entidades.Cliente;
import com.proyecto.servicio.ClienteServIMPL.CIMPL;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("VeggieDelivery")
public class ControladorCliente {

    @Autowired
    private CIMPL cimpl;

    @GetMapping
    @RequestMapping(value = "listaDeClientes", method = RequestMethod.GET)
    public ResponseEntity<?> listaClientes(){

        List<Cliente> listaClientes = this.cimpl.listaDeClientes();

        return ResponseEntity.ok(listaClientes);

    }

    @PostMapping
    @RequestMapping(value = "crearCliente", method = RequestMethod.POST)
    public ResponseEntity<?> crearCliente(@RequestBody Cliente cliente){

        Cliente clienteCreado = this.cimpl.crearCliente(cliente);

        return ResponseEntity.status(HttpStatus.CREATED).body(clienteCreado);

    }

    @PutMapping
    @RequestMapping(value = "modificarCliente", method = RequestMethod.PUT)
    public ResponseEntity<?> modificarCliente(@RequestBody Cliente cliente){

        Cliente clienteModificado = this.cimpl.modificarCliente(cliente);

        return ResponseEntity.status(HttpStatus.CREATED).body(clienteModificado);

    }

    @GetMapping
    @RequestMapping(value = "consultarCliente/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> consultarCliente(@PathVariable int id){

        Cliente cliente = this.cimpl.consultarCliente(id);

        return ResponseEntity.ok(cliente);

    }

    @DeleteMapping
    @RequestMapping(value = "eliminarCliente/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> eliminarCliente(@PathVariable int id){

        this.cimpl.eliminarCliente(id);

        return ResponseEntity.ok().build();

    }

}
