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
		Administrador dbAdmin = repo.findByUsername(admin.getUsername());
		if(dbAdmin != null) {
			System.out.println(admin);
			System.out.println(dbAdmin);
			if(dbAdmin.getUsername().equals(admin.getUsername()) && dbAdmin.getPassword().equals(admin.getPassword()))
				return true;
			else
				return false;
		}
		else
			return false;

	}


    public Administrador createAdmin(Administrador admin) {
        return repo.save(admin);
    }
}

