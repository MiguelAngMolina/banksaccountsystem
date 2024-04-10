package com.capstone.bankadmin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.bankadmin.exception.NotFoundException;
import com.capstone.bankadmin.model.Branch;
import com.capstone.bankadmin.service.BranchService;

@RestController
@RequestMapping("/branch")
public class BranchController {

	@Autowired
	private BranchService branchService;
	
	@PostMapping("/")
	public ResponseEntity<Boolean> createBranch(@RequestBody Branch branch) throws IllegalArgumentException {
		boolean created = branchService.createBranch(branch);
		if(created)
			return new ResponseEntity<>(true, HttpStatus.CREATED);
		else
			return new ResponseEntity<>(false, HttpStatus.CONFLICT);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<Branch>> getAllBranchDetails() {
		List<Branch> branchDetails = branchService.getAllBranchDetails();
		return new ResponseEntity<>(branchDetails, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteBranch(@PathVariable int id) throws NotFoundException {
		String response = branchService.deleteBranch(id);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@ExceptionHandler(value = NotFoundException.class)
	public ResponseEntity<String> handleNotFoundException(NotFoundException ex) {
		System.out.println(ex.getMessage());
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(value = IllegalArgumentException.class)
	public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
		System.out.println(ex.getMessage());
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
}
