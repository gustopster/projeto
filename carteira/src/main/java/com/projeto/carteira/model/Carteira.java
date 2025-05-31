package com.projeto.carteira.model;

import jakarta.persistence.*;

@Entity
@Table(name = "carteira")
public class Carteira {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String pedido;

    @Column(nullable = false)
    private String item;

    public void setId(Long id) {
        this.id = id;
    }
}
