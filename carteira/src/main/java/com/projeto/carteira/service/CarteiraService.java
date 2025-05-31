package com.projeto.carteira.service;

import com.projeto.carteira.model.Carteira;
import com.projeto.carteira.repository.CarteiraRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CarteiraService {

    private CarteiraRepository repository;

    public CarteiraService(CarteiraRepository repository) {
        this.repository = repository;
    }

    public List<Carteira> getAll() {
        return repository.findAll(Sort.by("id"));
    }

    public Carteira getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Não existe esse ID na Carteira: " + id));
    }

    public Carteira update(Long id, Carteira carteira) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Não existe esse ID na Carteira: " + id);
        }
        carteira.setId(id);
        return repository.save(carteira);
    }

    public Carteira create(Carteira carteira) {
        return repository.save(carteira);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Não existe esse ID na Carteira: " + id);
        }
        repository.deleteById(id);
    }
}
