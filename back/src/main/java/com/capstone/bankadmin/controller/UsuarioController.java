package com.capstone.bankadmin.controller;

import com.capstone.bankadmin.model.Usuario;
import com.capstone.bankadmin.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @GetMapping("/{id}")
    public Usuario getUsuarioById(@PathVariable String id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Usuario updateUsuario(@PathVariable String id, @RequestBody Usuario usuarioDetails) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario != null) {
            usuario.setFirstName(usuarioDetails.getFirstName());
            usuario.setLastName(usuarioDetails.getLastName());
            usuario.setBirthDate(usuarioDetails.getBirthDate());
            usuario.setCity(usuarioDetails.getCity());
            usuario.setContactNumber(usuarioDetails.getContactNumber());
            usuario.setEmail(usuarioDetails.getEmail());
            usuario.setOccupation(usuarioDetails.getOccupation());
            usuarioRepository.save(usuario);
        }
        return usuario;
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable String id) {
        usuarioRepository.deleteById(id);
    }
}
