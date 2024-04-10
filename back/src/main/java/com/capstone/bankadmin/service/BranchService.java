package com.capstone.bankadmin.service;

import java.util.List;

import com.capstone.bankadmin.exception.NotFoundException;
import com.capstone.bankadmin.model.Branch;

public interface BranchService {
	public boolean createBranch(Branch branch) throws IllegalArgumentException;
	public List<Branch> getAllBranchDetails();
	public String deleteBranch(int branchId) throws NotFoundException;
}
