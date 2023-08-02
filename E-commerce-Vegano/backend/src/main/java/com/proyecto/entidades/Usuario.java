package com.proyecto.entidades;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuarioId")
    private int usuarioId;

    @Column(name = "usuario")
    private String usuario;

    @Column(name = "contrasena")
    private String contrasena;

    //@Column(name = "clienteId")
    //private int clienteId;
    
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "TBL_USER_AUTHORITY", joinColumns = { @JoinColumn(name = "usuarioId") }, inverseJoinColumns = {
			@JoinColumn(name = "AUTHORITY_ID") })
	private Set<AuthorityEntity> authorities = new HashSet<>();
    
    /*
    @OneToOne(mappedBy = "usuario")
	private Cliente cliente;
	*/
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clienteId")
    private Cliente cliente;;
}
