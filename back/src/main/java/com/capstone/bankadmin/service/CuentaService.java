package com.capstone.bankadmin.service;

import com.capstone.bankadmin.model.Cuenta;
import com.capstone.bankadmin.repository.CuentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CuentaService {
    @Autowired
    private CuentaRepository cuentaRepository;

    public List<Cuenta> findAllCuentas() {
        return cuentaRepository.findAll();
    }

    public Cuenta saveCuenta(Cuenta cuenta) {
        return cuentaRepository.save(cuenta);
    }

    public Optional<Cuenta> findCuentaById(String id) {
        return cuentaRepository.findById(id);
    }

    public void deleteCuenta(String id) {
        cuentaRepository.deleteById(id);
    }

    public Cuenta findCuentaByAccountNumber(String accountNumber) {
        return cuentaRepository.findByAccountNumber(accountNumber);
    }

}
