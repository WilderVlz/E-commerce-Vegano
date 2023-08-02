package com.proyecto.controladores;

import com.proyecto.entidades.Plato;
import com.proyecto.servicio.platoServicioIMPL.PSIMPL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("VeggieDelivery")
public class ControladorPlato {

    @Autowired
    private PSIMPL psimpl;

    @GetMapping
    @RequestMapping(value = "listaDePlatos", method = RequestMethod.GET)
    public ResponseEntity<?> listDePlatos() {

        List<Plato> ListaDePlatosx = this.psimpl.listaDePlatos();

        return ResponseEntity.ok(ListaDePlatosx);

    }
    @PostMapping
    @RequestMapping(value = "crearPlato", method = RequestMethod.POST)
    public ResponseEntity<?> crearPlato(@RequestBody Plato plato){

        Plato platoCreado = this.psimpl.crearPlato(plato);

        return ResponseEntity.status(HttpStatus.CREATED).body(platoCreado);

    }

    @PutMapping
    @RequestMapping(value = "modificarPlato", method = RequestMethod.PUT)
    public ResponseEntity<?> modificarPlato(@RequestBody Plato plato) {

        Plato platoModificado = this.psimpl.modificarPlato(plato);

        return ResponseEntity.status(HttpStatus.CREATED).body(platoModificado);
    }

    @GetMapping
    @RequestMapping(value = "buscarPlato/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> buscarPlato(@PathVariable int id){

        Plato plato = this.psimpl.buscarPlato(id);

        return ResponseEntity.ok(plato);

    }
    @DeleteMapping
    @RequestMapping(value = "eliminarPlato/{id}",method = RequestMethod.DELETE)
    public ResponseEntity<?> eliminarPlato(@PathVariable int id){

        this.psimpl.eliminarPlato(id);

        return ResponseEntity.ok().build();

    }
}
