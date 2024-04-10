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
import com.capstone.bankadmin.model.Account;
import com.capstone.bankadmin.service.AccountService;


@RestController
@RequestMapping("/account")
public class AccountController {

	@Autowired
	private AccountService accountService;
	
	@PostMapping("/{id}")
	public ResponseEntity<Boolean> createAccount(@PathVariable int id, @RequestBody Account account) throws IllegalArgumentException {
		boolean created = accountService.createAccount(id, account);
		if(created)
			return new ResponseEntity<>(true, HttpStatus.CREATED);
		else
			return new ResponseEntity<>(false, HttpStatus.CONFLICT);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<Account>> getAllAccountDetails() {
		List<Account> accountDetails = accountService.getAllAccountDetails();
		return new ResponseEntity<>(accountDetails, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteAccount(@PathVariable int id) throws NotFoundException {
		String response = accountService.deleteAccount(id);
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
