package com.capstone.bankadmin.controller;

import com.capstone.bankadmin.model.Cuenta;
import com.capstone.bankadmin.model.Transaccion;
import com.capstone.bankadmin.repository.TransaccionRepository;
import com.capstone.bankadmin.repository.CuentaRepository;  
import com.capstone.bankadmin.dto.TransaccionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import javax.transaction.Transactional;

@RestController
@RequestMapping("/transacciones")
public class TransaccionController {
    @Autowired
    private TransaccionRepository transaccionRepository;

    @Autowired
    private CuentaRepository cuentaRepository;  

    @GetMapping("/")
    public List<Transaccion> getAllTransacciones() {
        return transaccionRepository.findAll();
    }

    @PostMapping("/")
    @Transactional
    public ResponseEntity<?> createTransaccion(@RequestBody TransaccionDTO transaccionDTO) {
    // Primero, encontrar las cuentas por sus ID
    Cuenta cuentaFrom = cuentaRepository.findById(transaccionDTO.getFromAccountId()).orElse(null);
    Cuenta cuentaTo = cuentaRepository.findById(transaccionDTO.getToAccountId()).orElse(null);

    // Verificar si las cuentas existen
    if (cuentaFrom == null) {
        return new ResponseEntity<>("Cuenta origen no encontrada.", HttpStatus.NOT_FOUND);
    }

    if (cuentaTo == null) {
        return new ResponseEntity<>("Cuenta destino no encontrada.", HttpStatus.NOT_FOUND);
    }

    // Validación del saldo en la cuenta origen
    if (cuentaFrom.getBalance() < transaccionDTO.getAmount()) {
        return ResponseEntity.badRequest().body("Saldo insuficiente en la cuenta origen.");
    }

    // Actualización de saldos
    cuentaFrom.setBalance(cuentaFrom.getBalance() - transaccionDTO.getAmount());
    cuentaTo.setBalance(cuentaTo.getBalance() + transaccionDTO.getAmount());

    // Guardar cuentas actualizadas
    cuentaRepository.save(cuentaFrom);
    cuentaRepository.save(cuentaTo);

    // Crear la entidad Transaccion con los datos de TransaccionDTO
    Transaccion newTransaccion = new Transaccion();
    newTransaccion.setTransactionNumber(transaccionDTO.getTransactionNumber());
    newTransaccion.setFromAccount(cuentaFrom); // cuentaFrom ya fue buscada por el ID
    newTransaccion.setToAccount(cuentaTo);     // cuentaTo ya fue buscada por el ID
    newTransaccion.setDate(transaccionDTO.getDate());
    newTransaccion.setAmount(transaccionDTO.getAmount());

    Transaccion savedTransaction = transaccionRepository.save(newTransaccion);
    return ResponseEntity.ok(savedTransaction);
    }


    @DeleteMapping("/{id}")
    public void deleteTransaccion(@PathVariable String id) {
        transaccionRepository.deleteById(id);
    }


    //get by id
    @GetMapping("/{id}")
    public ResponseEntity<Transaccion> getTransaccionById(@PathVariable String id) {
        Transaccion transaccion = transaccionRepository.findById(id).orElse(null);
        if (transaccion == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(transaccion);
    }

    
}
