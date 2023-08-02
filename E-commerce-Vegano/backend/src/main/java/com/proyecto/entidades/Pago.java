package com.proyecto.entidades;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Entity
@Table(name = "pago")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pagoId")
    private int pagoId;
    @Column(name = "monto")
    private double monto;
    @Column(name = "medioDePago")
    private String medioDePago;


}
