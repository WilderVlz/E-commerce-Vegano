package com.proyecto.controladores;

import com.proyecto.repositorio.PlatoCaliRepo;
import com.proyecto.servicio.PlatoCaliService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("VeggieDelivery")
public class ControlCaliPlato {
    private final PlatoCaliService platoCaliService;


    public ControlCaliPlato(PlatoCaliService platoCaliService){

        this.platoCaliService = platoCaliService;
    }

    @GetMapping
    @RequestMapping(value = "CalificacionesDelPlato/{categoria}", method = RequestMethod.GET)
    public List<Integer> obtenerCalificaciones(@PathVariable String categoria){

        return (List<Integer>) this.platoCaliService.calcularCalificacionPlato(categoria);

    }
}
