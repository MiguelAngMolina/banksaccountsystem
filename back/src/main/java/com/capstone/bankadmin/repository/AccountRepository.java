package com.capstone.bankadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.bankadmin.model.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer>{

}
