package com.proyecto.servicio.ClienteServIMPL;

import com.proyecto.entidades.Cliente;
import com.proyecto.repositorio.ClienteRepositorio;
import com.proyecto.servicio.ClienteServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CIMPL implements ClienteServicio {

    @Autowired
    private ClienteRepositorio clienteRepositorio;
    @Override
    public List<Cliente> listaDeClientes() {
        return (List<Cliente>) this.clienteRepositorio.findAll();
    }

    @Override
    public Cliente crearCliente(Cliente cliente) {

        cliente.setNombre(cliente.getNombre());

        return this.clienteRepositorio.save(cliente);
    }

    @Override
    public Cliente modificarCliente(Cliente cliente) {
        return this.clienteRepositorio.save(cliente);
    }

    @Override
    public Cliente consultarCliente(int id) {
        return this.clienteRepositorio.findById(id).get();
    }

    @Override
    public void eliminarCliente(int id) {
        this.clienteRepositorio.deleteById(id);
    }
}
