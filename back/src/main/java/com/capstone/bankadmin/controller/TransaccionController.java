package com.capstone.bankadmin.controller;

import com.capstone.bankadmin.model.Transaccion;
import com.capstone.bankadmin.repository.TransaccionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transacciones")
public class TransaccionController {
    @Autowired
    private TransaccionRepository transaccionRepository;

    @GetMapping
    public List<Transaccion> getAllTransacciones() {
        return transaccionRepository.findAll();
    }

    @PostMapping
    public Transaccion createTransaccion(@RequestBody Transaccion transaccion) {
        return transaccionRepository.save(transaccion);
    }

    @GetMapping("/{id}")
    public Transaccion getTransaccionById(@PathVariable Long id) {
        return transaccionRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Transaccion updateTransaccion(@PathVariable Long id, @RequestBody Transaccion transaccionDetails) {
        Transaccion transaccion = transaccionRepository.findById(id).orElse(null);
        if (transaccion != null) {
            transaccion.setTransactionNumber(transaccionDetails.getTransactionNumber());
            transaccion.setFromAccount(transaccionDetails.getFromAccount());
            transaccion.setToAccount(transaccionDetails.getToAccount());
            transaccion.setDate(transaccionDetails.getDate());
            transaccion.setAmount(transaccionDetails.getAmount());
            transaccionRepository.save(transaccion);
        }
        return transaccion;
    }

    @DeleteMapping("/{id}")
    public void deleteTransaccion(@PathVariable Long id) {
        transaccionRepository.deleteById(id);
    }
}
