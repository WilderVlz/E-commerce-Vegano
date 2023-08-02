package com.proyecto.servicio;

import com.proyecto.entidades.Plato;

import java.util.List;

public interface PlatoServicio {

    public List<Plato> listaDePlatos();

    public Plato crearPlato(Plato plato);

    public Plato modificarPlato(Plato plato);

    public Plato buscarPlato(int id);

    public void eliminarPlato(int id);
}
