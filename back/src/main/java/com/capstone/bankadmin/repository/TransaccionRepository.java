package com.capstone.bankadmin.repository;

import com.capstone.bankadmin.model.Transaccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransaccionRepository extends JpaRepository<Transaccion, String> {
    
}
