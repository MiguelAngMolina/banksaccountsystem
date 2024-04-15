package com.capstone.bankadmin.repository;

import com.capstone.bankadmin.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    // Aquí puedes agregar consultas personalizadas, por ejemplo, buscar por email
    Usuario findByEmail(String email);

}
