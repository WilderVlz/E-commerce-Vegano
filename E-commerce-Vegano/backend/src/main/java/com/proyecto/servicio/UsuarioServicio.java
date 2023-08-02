package com.proyecto.servicio;

import com.proyecto.entidades.Usuario;

import java.util.List;

public interface UsuarioServicio {

    public List<Usuario> listaDeUsuarios();

    public Usuario crearUsuario(Usuario usuario);

    public Usuario modificarUsuario(Usuario usuario);

    public Usuario consultarUsuario(int id);

    public void eliminarUsuario(int id);
}
