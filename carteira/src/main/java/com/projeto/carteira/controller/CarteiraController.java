package com.projeto.carteira.controller;

import com.projeto.carteira.model.Carteira;
import com.projeto.carteira.repository.CarteiraRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/carteira")
public class CarteiraController {

    private final CarteiraRepository repository;

    public CarteiraController(CarteiraRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Carteira> getAll() {
        return repository.findAll(org.springframework.data.domain.Sort.by("id"));
    }

    @GetMapping("/{id}")
    public Carteira getById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Não existe esse ID na Carteira: " + id));
    }

    @PutMapping("/{id}")
    public Carteira update(@PathVariable Long id, @RequestBody Carteira carteira) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Não existe esse ID na Carteira: " + id);
        }
        carteira.setId(id);
        return repository.save(carteira);
    }

    @PostMapping()
    public Carteira create(@RequestBody Carteira carteira) {
        return repository.save(carteira);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Não existe esse ID na Carteira: " + id);
        }
        repository.deleteById(id);
    }
}
