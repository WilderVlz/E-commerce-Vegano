package com.proyecto.servicio;

import com.proyecto.entidades.Pago;

import java.util.List;

public interface PagoServicio {

    public List<Pago> listaDePagos();

    public Pago crearPago(Pago pago);

    public Pago modificarPago(Pago pago);

    public Pago consultarPago(int id);

    public void eliminarPago(int id);
}
