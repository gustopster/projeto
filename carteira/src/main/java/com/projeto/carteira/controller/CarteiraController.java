package com.projeto.carteira.controller;

import com.projeto.carteira.model.Carteira;
import com.projeto.carteira.service.CarteiraService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/carteira")
public class CarteiraController {

    private final CarteiraService service;

    public CarteiraController(
            CarteiraService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<Carteira> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Carteira getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Carteira update(@PathVariable Long id, @RequestBody Carteira carteira) {
        return service.update(id, carteira);
    }

    @PostMapping()
    public Carteira create(@RequestBody Carteira carteira) {
        return service.create(carteira);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
