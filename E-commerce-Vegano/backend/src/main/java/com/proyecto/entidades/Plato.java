package com.proyecto.entidades;





import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@ToString
@Entity
@Table(name="plato")
public class Plato {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "platoId")
	private int platoId;
	@Column(name = "nombre")
	private String nombre;
	@Column(name= "precio")
	private float precio;
	@Column(name= "descripcion")
	private String descripcion;
	@Column(name= "vegano")
	private boolean vegano;
	@Column(name= "sintacc")
	private boolean sinTACC;
	@Column(name= "calificacion")
	private int calificacion;
	@Column(name= "urlImagen")
	private String urlImagen;
	@Column(name= "stock")
	private int stock;
	@Column(name= "tipoPlato")
	private String tipoPlato;
	@Column(name = "categoria")
	private String categoria;
}
