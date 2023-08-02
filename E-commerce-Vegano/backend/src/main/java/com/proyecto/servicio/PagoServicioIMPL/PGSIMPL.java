package com.proyecto.servicio.PagoServicioIMPL;

import com.proyecto.entidades.Pago;
import com.proyecto.repositorio.PagoRepositorio;
import com.proyecto.servicio.PagoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PGSIMPL implements PagoServicio {

    @Autowired
    PagoRepositorio pagoRepositorio;
    @Override
    public List<Pago> listaDePagos() {
        return (List<Pago>) this.pagoRepositorio.findAll();
    }

    @Override
    public Pago crearPago(Pago pago) {

        pago.setMedioDePago(pago.getMedioDePago());

        return this.pagoRepositorio.save(pago);
    }

    @Override
    public Pago modificarPago(Pago pago) {
        return this.pagoRepositorio.save(pago);
    }

    @Override
    public Pago consultarPago(int id) {
        return this.pagoRepositorio.findById(id).get();
    }

    @Override
    public void eliminarPago(int id) {

        this.pagoRepositorio.deleteById(id);

    }
}
