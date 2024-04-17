package com.capstone.bankadmin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.bankadmin.model.Administrador;
import com.capstone.bankadmin.repository.AdministradorRepository;
import com.capstone.bankadmin.service.AdministradorService;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/admin")
public class AdministradorController {

    @Autowired
	private AdministradorService adminService;

	@Autowired
	private AdministradorRepository administradorRepository;

	
	@PostMapping("/")
	public ResponseEntity<Boolean> authenticateAdmin(@RequestBody Administrador admin) {
		boolean authenticated = adminService.authenticateAdmin(admin);
		if(authenticated)
			return new ResponseEntity<>(true, HttpStatus.OK);
		else
			return new ResponseEntity<>(false, HttpStatus.FORBIDDEN);
	}

	@GetMapping("/")
    public List<Administrador> getAllAdministradors() {
        return administradorRepository.findAll();
    }
	

	@PostMapping("/create")
    public ResponseEntity<Administrador> createAdmin(@RequestBody Administrador admin) {
        Administrador newAdmin = adminService.createAdmin(admin);
        return ResponseEntity.ok(newAdmin);
    }

}