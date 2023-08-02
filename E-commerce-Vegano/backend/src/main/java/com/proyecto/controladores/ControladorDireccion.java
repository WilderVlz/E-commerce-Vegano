package com.proyecto.controladores;

import com.proyecto.entidades.Direccion;
import com.proyecto.servicio.direccionServIMPL.DSIMPL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("VeggieDelivery")
public class ControladorDireccion {

    @Autowired
    private DSIMPL dsimpl;

    @GetMapping
    @RequestMapping(value = "listaDeDirecciones", method = RequestMethod.GET)
    public ResponseEntity<?> listaDirecciones(){

        List<Direccion> listaDirecciones = this.dsimpl.listaDeDirecciones();

        return ResponseEntity.ok(listaDirecciones);
    }

    @PostMapping
    @RequestMapping(value = "crearDireccion", method = RequestMethod.POST)
    public ResponseEntity<?> crearDireccion(@RequestBody Direccion direccion){

        Direccion direccionCreada = this.dsimpl.crearDireccion(direccion);

        return ResponseEntity.status(HttpStatus.CREATED).body(direccionCreada);

    }

    @PutMapping
    @RequestMapping(value = "modificarDireccion", method = RequestMethod.PUT)
    public ResponseEntity<?> modificarDireccion(@RequestBody Direccion direccion){

        Direccion direccionModificada = this.dsimpl.modificarDireccion(direccion);

        return ResponseEntity.status(HttpStatus.CREATED).body(direccionModificada);

    }

    @GetMapping
    @RequestMapping(value = "buscarDireccion/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> buscarDireccion(@PathVariable int id){

        Direccion direccion = this.dsimpl.buscarDireccion(id);

        return ResponseEntity.ok(direccion);

    }

    @DeleteMapping
    @RequestMapping(value = "eliminarDireccion/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> eliminarDireccion(@PathVariable int id){

        this.dsimpl.eliminarDireccion(id);

        return ResponseEntity.ok().build();

    }

}
