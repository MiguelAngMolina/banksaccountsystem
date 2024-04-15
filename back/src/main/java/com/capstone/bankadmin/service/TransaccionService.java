package com.capstone.bankadmin.service;

import com.capstone.bankadmin.model.Transaccion;
import com.capstone.bankadmin.repository.TransaccionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransaccionService {
    @Autowired
    private TransaccionRepository transaccionRepository;

    public List<Transaccion> findAllTransacciones() {
        return transaccionRepository.findAll();
    }

    public Transaccion saveTransaccion(Transaccion transaccion) {
        return transaccionRepository.save(transaccion);
    }

    public Optional<Transaccion> findTransaccionById(String id) {
        return transaccionRepository.findById(id);
    }

    public void deleteTransaccion(String id) {
        transaccionRepository.deleteById(id);
    }
}
