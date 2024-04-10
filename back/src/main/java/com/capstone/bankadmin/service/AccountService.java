package com.capstone.bankadmin.service;

import java.util.List;

import com.capstone.bankadmin.exception.NotFoundException;
import com.capstone.bankadmin.model.Account;

public interface AccountService {
	public boolean createAccount(int id, Account account) throws IllegalArgumentException;
	public List<Account> getAllAccountDetails();
	public String deleteAccount(int accountId) throws NotFoundException;
}
