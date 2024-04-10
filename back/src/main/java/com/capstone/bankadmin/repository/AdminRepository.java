package com.capstone.bankadmin.repository;

import org.springframework.stereotype.Repository;

import com.capstone.bankadmin.model.Admin;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String>{

	public Admin findByUserId(String userId);
}
