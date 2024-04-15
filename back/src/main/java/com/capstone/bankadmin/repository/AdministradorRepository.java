package com.capstone.bankadmin.repository;

import com.capstone.bankadmin.model.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, String> {


	public Administrador findByUserId(String userId);

}
