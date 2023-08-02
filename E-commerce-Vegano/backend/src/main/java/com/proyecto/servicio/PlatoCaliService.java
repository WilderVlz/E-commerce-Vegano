package com.proyecto.servicio;

import com.proyecto.entidades.Plato;
import com.proyecto.repositorio.PlatoCaliRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlatoCaliService {


    private final PlatoCaliRepo platoCaliRepo;

    public PlatoCaliService(PlatoCaliRepo platoCaliRepo) {

        this.platoCaliRepo = platoCaliRepo;

    }

    public List<Integer> calcularCalificacionPlato(String categoria) {

        List<Plato> platos = this.platoCaliRepo.findAllByCategoriaOrderByPlatoIdAsc(categoria);
        List<Integer> cuentaProgresiva = new ArrayList<>();
        int suma = 0;

        for (Plato plato : platos) {

            suma += plato.getCalificacion();
            cuentaProgresiva.add(suma);
        }
        return cuentaProgresiva;
    }
}
