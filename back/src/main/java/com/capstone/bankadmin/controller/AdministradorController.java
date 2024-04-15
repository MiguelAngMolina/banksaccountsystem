package com.capstone.bankadmin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.bankadmin.model.Administrador;
import com.capstone.bankadmin.service.AdministradorService;


@RestController
@RequestMapping("/admin")
public class AdministradorController {

    @Autowired
	private AdministradorService adminService;
	
	@PostMapping("/")
	public ResponseEntity<Boolean> authenticateAdmin(@RequestBody Administrador admin) {
		boolean authenticated = adminService.authenticateAdmin(admin);
		if(authenticated)
			return new ResponseEntity<>(true, HttpStatus.OK);
		else
			return new ResponseEntity<>(false, HttpStatus.FORBIDDEN);
	}

}