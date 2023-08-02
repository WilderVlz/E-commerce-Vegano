package com.proyecto.entidades;

import java.sql.Date;

import lombok.*;
import org.springframework.data.annotation.Id;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;


@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Entity
@Table(name="pedido")
public class Pedido{
	
	@jakarta.persistence.Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pedidoId")
	private int pedidoId;
	@Column(name = "usuarioId")
	private int usuarioId;
	@Column(name = "direccionId")
	private int direccionId;
	@Column(name = "pagoId")
	private int pagoId;
	@Column(name = "fechaPedido")
	private Date fechaPedido;
	@Column(name = "fechaEntrega")
	private Date fechaEntrega;
	@Column(name = "fechaEntregaEstimada")
	private Date fechaEntregaEstimada;
	@Column(name = "estadoPedidoId")
	private int estadoPedidoId;
}
