package com.capstone.bankadmin.controller;


import com.capstone.bankadmin.model.Cuenta;
import com.capstone.bankadmin.repository.CuentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cuentas")
public class CuentaController {
    @Autowired
    private CuentaRepository cuentaRepository;

    @GetMapping
    public List<Cuenta> getAllCuentas() {
        return cuentaRepository.findAll();
    }

    @PostMapping
    public Cuenta createCuenta(@RequestBody Cuenta cuenta) {
        return cuentaRepository.save(cuenta);
    }

    @GetMapping("/{id}")
    public Cuenta getCuentaById(@PathVariable String id) {
        return cuentaRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Cuenta updateCuenta(@PathVariable String id, @RequestBody Cuenta cuentaDetails) {
        Cuenta cuenta = cuentaRepository.findById(id).orElse(null);
        if (cuenta != null) {
            cuenta.setAccountNumber(cuentaDetails.getAccountNumber());
            cuenta.setBalance(cuentaDetails.getBalance());
            cuenta.setAccountType(cuentaDetails.getAccountType());
            cuenta.setAccountStatus(cuentaDetails.getAccountStatus());
            cuentaRepository.save(cuenta);
        }
        return cuenta;
    }

    @DeleteMapping("/{id}")
    public void deleteCuenta(@PathVariable String id) {
        cuentaRepository.deleteById(id);
    }
}
