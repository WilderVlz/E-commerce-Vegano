package com.proyecto.servicio.UsuarioServIMPL;

import com.proyecto.entidades.Usuario;
import com.proyecto.repositorio.UsuarioRepositorio;
import com.proyecto.servicio.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class USIMPL implements UsuarioServicio {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;


    @Override
    public List<Usuario> listaDeUsuarios() {
        return (List<Usuario>) this.usuarioRepositorio.findAll();
    }

    @Override
    public Usuario crearUsuario(Usuario usuario) {

        usuario.setUsuario(usuario.getUsuario());

        return this.usuarioRepositorio.save(usuario);
    }

    @Override
    public Usuario modificarUsuario(Usuario usuario) {

        return this.usuarioRepositorio.save(usuario);
    }

    @Override
    public Usuario consultarUsuario(int id) {

        return this.usuarioRepositorio.findById(id).get();

    }

    @Override
    public void eliminarUsuario(int id) {

        this.usuarioRepositorio.deleteById(id);

    }
}
