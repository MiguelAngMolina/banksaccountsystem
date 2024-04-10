package com.capstone.bankadmin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.bankadmin.exception.NotFoundException;
import com.capstone.bankadmin.model.Branch;
import com.capstone.bankadmin.repository.BranchRepository;

@Service
public class BranchServiceImpl implements BranchService {
	
	@Autowired
	private BranchRepository repo;

	@Override
	public boolean createBranch(Branch branch) throws IllegalArgumentException {
		if(branch != null && (branch.getBranchName() == null || branch.getBranchCity() == null))
			throw new IllegalArgumentException("Branch details should not be Null");
		if(branch.getBranchName() == "" || branch.getBranchCity() == "")
			throw new IllegalArgumentException("Branch details should not be Empty");
		Branch savedBranch = repo.save(branch);
		if(savedBranch != null)
			return true;
		else
			return false;
	}

	@Override
	public List<Branch> getAllBranchDetails() {
		return repo.findAll();
	}

	@Override
	public String deleteBranch(int branchId) throws NotFoundException {
		Branch b = repo.findById(branchId).orElseThrow(() -> new NotFoundException("Branch with Id: "+ branchId + " not found!"));
		repo.deleteById(b.getBranchId());
		return "Branch with Id: " + branchId + " deleted!";
	}

}
