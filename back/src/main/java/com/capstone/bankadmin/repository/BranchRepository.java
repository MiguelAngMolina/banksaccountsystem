package com.capstone.bankadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.bankadmin.model.Branch;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Integer>{

}
