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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPedido() {
        return pedido;
    }

    public void setPedido(String name) {
        this.pedido = name;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String name) {
        this.item = name;
    }
}
