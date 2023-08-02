package com.proyecto.servicio;

import com.proyecto.entidades.Cliente;

import java.util.List;

public interface ClienteServicio {

    public List<Cliente> listaDeClientes();

    public Cliente crearCliente(Cliente cliente);

    public Cliente modificarCliente(Cliente cliente);

    public Cliente consultarCliente(int id);

    public void eliminarCliente(int id);
}
