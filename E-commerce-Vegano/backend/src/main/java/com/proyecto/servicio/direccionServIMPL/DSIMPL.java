package com.proyecto.servicio.direccionServIMPL;

import com.proyecto.entidades.Direccion;
import com.proyecto.repositorio.DireccionRepositorio;
import com.proyecto.servicio.DireccionServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DSIMPL implements DireccionServicio {

    @Autowired
    private DireccionRepositorio direccionRepositorio;
    @Override
    public List<Direccion> listaDeDirecciones() {
        return (List<Direccion>) this.direccionRepositorio.findAll();
    }

    @Override
    public Direccion crearDireccion(Direccion direccion) {

        direccion.setNombreCalle(direccion.getNombreCalle());

        return this.direccionRepositorio.save(direccion);
    }

    @Override
    public Direccion modificarDireccion(Direccion direccion) {

        return this.direccionRepositorio.save(direccion);
    }

    @Override
    public Direccion buscarDireccion(int id) {

        return this.direccionRepositorio.findById(id).get();
    }

    @Override
    public void eliminarDireccion(int id) {

        this.direccionRepositorio.deleteById(id);

    }
}
