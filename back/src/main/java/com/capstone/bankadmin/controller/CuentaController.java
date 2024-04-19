package com.capstone.bankadmin.controller;


import com.capstone.bankadmin.dto.CuentaDTO;
import com.capstone.bankadmin.model.Cuenta;
import com.capstone.bankadmin.model.Usuario;
import com.capstone.bankadmin.repository.CuentaRepository;
import com.capstone.bankadmin.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cuentas")
public class CuentaController {
    @Autowired
    private CuentaRepository cuentaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository; // Asegúrate de inyectar el repositorio de Usuario


    @GetMapping("/")
    public List<Cuenta> getAllCuentas() {
        return cuentaRepository.findAll();
    }

    @PostMapping("/")
    public ResponseEntity<?> createCuenta(@RequestBody CuentaDTO cuentaDTO) {
        if (cuentaDTO.getUserId() == null) {
            return new ResponseEntity<>("ID de usuario requerido", HttpStatus.BAD_REQUEST);
        }
        Usuario usuario = usuarioRepository.findById(cuentaDTO.getUserId()).orElse(null);
        if (usuario == null) {
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }
        
        Cuenta cuenta = new Cuenta();
        cuenta.setAccountNumber(cuentaDTO.getAccountNumber());
        cuenta.setBalance(cuentaDTO.getBalance());
        cuenta.setAccountType(cuentaDTO.getAccountType());
        cuenta.setUsuario(usuario);
        
        cuentaRepository.save(cuenta);
        return new ResponseEntity<>(cuenta, HttpStatus.CREATED);
    }
    



    @GetMapping("/{id}")
    public Cuenta getCuentaById(@PathVariable String id) {
        return cuentaRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
public ResponseEntity<?> updateCuenta(@PathVariable String id, @RequestBody CuentaDTO cuentaDTO) {
    Cuenta cuentaExistente = cuentaRepository.findById(id).orElse(null);
    if (cuentaExistente == null) {
        return new ResponseEntity<>("Cuenta no encontrada", HttpStatus.NOT_FOUND);
    }

    // Actualizar los datos de la cuenta existente con los del DTO
    cuentaExistente.setBalance(cuentaDTO.getBalance());
    cuentaExistente.setAccountType(cuentaDTO.getAccountType());
    
    // Buscar y asociar el usuario si es necesario
    if (cuentaDTO.getUserId() != null) {
        Usuario usuario = usuarioRepository.findById(cuentaDTO.getUserId()).orElse(null);
        if (usuario == null) {
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }
        cuentaExistente.setUsuario(usuario);
    }

    cuentaRepository.save(cuentaExistente);
    return new ResponseEntity<>(cuentaExistente, HttpStatus.OK);
}



    @DeleteMapping("/{id}")
    public void deleteCuenta(@PathVariable String id) {
        cuentaRepository.deleteById(id);
    }
}
