package com.capstone.bankadmin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.bankadmin.exception.NotFoundException;
import com.capstone.bankadmin.model.Account;
import com.capstone.bankadmin.model.Customer;
import com.capstone.bankadmin.repository.AccountRepository;
import com.capstone.bankadmin.repository.CustomerRepository;


@Service
public class AccountServiceImpl implements AccountService{
	
	@Autowired
	private AccountRepository repo;
	
	@Autowired
	private CustomerRepository customerRepo;

	@Override
	public boolean createAccount(int id, Account account) throws NotFoundException, IllegalArgumentException {
		Customer c = customerRepo.findById(id).orElseThrow(() -> new NotFoundException("Customer not found!"));
		
		if(account != null && (account.getAccountNumber() == 0 || account.getAccountStatus() == null || account.getAccountType() == null ))
			throw new IllegalArgumentException("Account details should not be Null");
		if(account.getAccountStatus() == "" || account.getAccountType() == "" )
			throw new IllegalArgumentException("Account details should not be Empty");
		account.setCustomer(c);
		Account savedAccount= repo.save(account);
		if(savedAccount != null)
			return true;
		else
			return false;
	}

	@Override
	public List<Account> getAllAccountDetails() {
		return repo.findAll();
	}

	@Override
	public String deleteAccount(int accountId) throws NotFoundException {
		Account acc = repo.findById(accountId).orElseThrow(() -> new NotFoundException("Account with Id: "+ accountId + " not found!"));
		repo.deleteById(acc.getAccountNumber());
		return "Branch with Id: " + accountId + " deleted!";
	}

}
