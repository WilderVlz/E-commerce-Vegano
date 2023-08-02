package com.proyecto.controladores;

import com.proyecto.entidades.Usuario;
import com.proyecto.servicio.UsuarioServIMPL.USIMPL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("VeggieDelivery")
public class ControladorUsuario {
    @Autowired
    private USIMPL usimpl;

    @GetMapping
    @RequestMapping(value = "listaDeUsuarios", method = RequestMethod.GET)
    public ResponseEntity<?> listaUsuarios(){

        List<Usuario> listaUsuarios = this.usimpl.listaDeUsuarios();

        return ResponseEntity.ok(listaUsuarios);

    }

    @PostMapping
    @RequestMapping(value = "crearUsuario" ,method = RequestMethod.POST)
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario){

        Usuario usuarioNuevo = this.usimpl.crearUsuario(usuario);

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioNuevo);

    }

    @PutMapping
    @RequestMapping(value = "modificarUsuario", method = RequestMethod.PUT)
    public ResponseEntity<?> modificarUsuario(@RequestBody Usuario usuario){

        Usuario usuarioModificado = this.usimpl.modificarUsuario(usuario);

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioModificado);

    }

    @GetMapping
    @RequestMapping(value = "consultarUsuario/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> consultarUsuario(@PathVariable int id){

        Usuario usuario = this.usimpl.consultarUsuario(id);

        return ResponseEntity.ok(usuario);

    }

    @DeleteMapping
    @RequestMapping(value = "eliminarUsuario/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> eliminarUsuario(@PathVariable int id){

        this.usimpl.eliminarUsuario(id);

        return ResponseEntity.ok().build();

    }


}
