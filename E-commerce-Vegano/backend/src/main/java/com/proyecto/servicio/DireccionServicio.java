package com.proyecto.servicio;

import com.proyecto.entidades.Direccion;

import java.util.List;

public interface DireccionServicio {


    public List<Direccion> listaDeDirecciones();

    public Direccion crearDireccion(Direccion direccion);

    public Direccion modificarDireccion(Direccion direccion);

    public Direccion buscarDireccion(int id);

    public void eliminarDireccion(int id);

}
