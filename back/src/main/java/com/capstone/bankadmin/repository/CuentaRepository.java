package com.capstone.bankadmin.repository;

import com.capstone.bankadmin.model.Cuenta;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuentaRepository extends JpaRepository<Cuenta, String> {
    // Puedes agregar métodos para buscar cuentas por número de cuenta o usuario
    Cuenta findByAccountNumber(String accountNumber);
    
}
