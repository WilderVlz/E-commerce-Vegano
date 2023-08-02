package com.proyecto.util.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

	private String usuario;
	private String contrasena;
	private String nombre;
	private String apellido;
	private String email;
	private String numeroCelular;
	private Integer idRol;
  
}
