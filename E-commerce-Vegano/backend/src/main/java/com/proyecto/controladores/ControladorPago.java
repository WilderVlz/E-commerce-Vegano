package com.proyecto.controladores;

import com.proyecto.entidades.Pago;
import com.proyecto.servicio.PagoServicioIMPL.PGSIMPL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("pago")
public class ControladorPago {

    @Autowired
    private PGSIMPL pgsimpl;

    /* Entidad Pago */

    @GetMapping
    @RequestMapping(value = "listaDePagos", method = RequestMethod.GET)
    public ResponseEntity<?> listaPagos(){
        List<Pago> listaDePagos = this.pgsimpl.listaDePagos();

        return ResponseEntity.ok(listaDePagos);
    }

    @PostMapping
    @RequestMapping(value = "crearPago", method = RequestMethod.POST)
    public ResponseEntity<?> crearPago(@RequestBody Pago pago){

        Pago pagoCreado = this.pgsimpl.crearPago(pago);

        return ResponseEntity.status(HttpStatus.CREATED).body(pagoCreado);

    }

    @PutMapping
    @RequestMapping(value = "modificarPago", method = RequestMethod.PUT)
    public ResponseEntity<?> modificarPago(@RequestBody Pago pago){

        Pago pagoModificado = this.pgsimpl.modificarPago(pago);

        return ResponseEntity.status(HttpStatus.CREATED).body(pagoModificado);

    }

    @GetMapping
    @RequestMapping (value = "consultarPago/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> consultarPago(@PathVariable int id){

        Pago pago = this.pgsimpl.consultarPago(id);

        return ResponseEntity.ok(pago);

    }

    @DeleteMapping
    @RequestMapping(value = "eliminarPago/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> eliminarPago(@PathVariable int id){

        this.pgsimpl.eliminarPago(id);

        return ResponseEntity.ok().build();

    }
}
