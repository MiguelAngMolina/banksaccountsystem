package com.capstone.bankadmin.controller;

import com.capstone.bankadmin.model.Cuenta;
import com.capstone.bankadmin.model.Transaccion;
import com.capstone.bankadmin.repository.TransaccionRepository;
import com.capstone.bankadmin.repository.CuentaRepository;  
import com.capstone.bankadmin.dto.TransaccionDTO;
import org.springframework.beans.factory.annotation.Autowired;
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
    private CuentaRepository cuentaRepository;  // Asegúrate de inyectar el repositorio de Cuentas


    @GetMapping
    public List<Transaccion> getAllTransacciones() {
        return transaccionRepository.findAll();
    }

    
    @PostMapping
    @Transactional
    public ResponseEntity<?> createTransaccion(@RequestBody TransaccionDTO transaccionDTO) {
            // Verificar que los IDs no sean nulos
            System.out.println("From Account ID: " + transaccionDTO.getFromAccountId());
            System.out.println("To Account ID: " + transaccionDTO.getToAccountId());   
        if (transaccionDTO.getFromAccountId() == null || transaccionDTO.getToAccountId() == null) {
            return ResponseEntity.badRequest().body("Los ID de las cuentas no pueden ser nulos.");
        }

        // Logging para depuración
        System.out.println("From Account ID: " + transaccionDTO.getFromAccountId());
        System.out.println("To Account ID: " + transaccionDTO.getToAccountId());

        Cuenta fromAccount = cuentaRepository.findById(transaccionDTO.getFromAccountId()).orElse(null);
        Cuenta toAccount = cuentaRepository.findById(transaccionDTO.getToAccountId()).orElse(null);

        if (fromAccount == null || toAccount == null) {
            return ResponseEntity.badRequest().body("Una o ambas cuentas no existen.");
        }

        if (fromAccount.getBalance() < transaccionDTO.getAmount()) {
            return ResponseEntity.badRequest().body("Saldo insuficiente en la cuenta origen.");
        }

        fromAccount.setBalance(fromAccount.getBalance() - transaccionDTO.getAmount());
        toAccount.setBalance(toAccount.getBalance() + transaccionDTO.getAmount());

        cuentaRepository.save(fromAccount);
        cuentaRepository.save(toAccount);

        Transaccion newTransaccion = new Transaccion();
        newTransaccion.setTransactionNumber(transaccionDTO.getTransactionNumber());
        newTransaccion.setFromAccount(fromAccount);
        newTransaccion.setToAccount(toAccount);
        newTransaccion.setDate(transaccionDTO.getDate());
        newTransaccion.setAmount(transaccionDTO.getAmount());

        Transaccion savedTransaction = transaccionRepository.save(newTransaccion);
        return ResponseEntity.ok(savedTransaction);
    
    }

    

    @DeleteMapping("/{id}")
    public void deleteTransaccion(@PathVariable String id) {
        transaccionRepository.deleteById(id);
    }
}
