package com.capstone.bankadmin.service;

import com.capstone.bankadmin.model.Usuario;
import com.capstone.bankadmin.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> findAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario saveUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> findUsuarioById(String id) {
        return usuarioRepository.findById(id);
    }

    public void deleteUsuario(String id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario findUsuarioByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
}
