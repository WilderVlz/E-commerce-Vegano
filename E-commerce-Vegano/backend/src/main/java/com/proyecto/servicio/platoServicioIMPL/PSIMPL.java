package com.proyecto.servicio.platoServicioIMPL;

import com.proyecto.entidades.Plato;
import com.proyecto.repositorio.PlatoRepositorio;
import com.proyecto.servicio.PlatoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PSIMPL implements PlatoServicio {

    @Autowired
    private PlatoRepositorio platoRepositorio;

    @Override
    public List<Plato> listaDePlatos() {
        return (List<Plato>) this.platoRepositorio.findAll();
    }

    @Override
    public Plato crearPlato(Plato plato) {

        plato.setNombre(plato.getNombre());

        return this.platoRepositorio.save(plato);
    }

    @Override
    public Plato modificarPlato(Plato plato) {
        return this.platoRepositorio.save(plato);
    }

    @Override
    public Plato buscarPlato(int id) {
        return this.platoRepositorio.findById(id).get();
    }

    @Override
    public void eliminarPlato(int id) {

        this.platoRepositorio.deleteById(id);
    }
}
