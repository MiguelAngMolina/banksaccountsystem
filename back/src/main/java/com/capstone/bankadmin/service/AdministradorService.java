package com.capstone.bankadmin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.bankadmin.model.Administrador;
import com.capstone.bankadmin.repository.AdministradorRepository;

@Service
public class AdministradorService {

    @Autowired
    private AdministradorRepository repo;
    
    public boolean authenticateAdmin(Administrador admin) {
        Administrador dbAdmin = repo.findByUserId(admin.getUserId());
        return dbAdmin != null && dbAdmin.getPassword().equals(admin.getPassword());
    }
}
