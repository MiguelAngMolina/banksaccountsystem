package com.capstone.bankadmin.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.sql.Date;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.capstone.bankadmin.model.Account;
import com.capstone.bankadmin.repository.AccountRepository;
@SpringBootTest
public class AccountServiceImplTest {

	 @Mock
	 private AccountRepository repo;
	 @InjectMocks
	 private AccountServiceImpl service;
	 
	
	 @SuppressWarnings("deprecation")
	@Test
	 public void getAllAccountDetailsTest() {
		 
		 when(repo.findAll()).thenReturn(
				 Stream.of( new Account(12,"1",5000,"Saving","Active", new Date(2022, 11, 9)),new Account(12,"1",15000,"Saving","Inactive", new Date(2022, 11, 9))).collect(Collectors.toList()));
		 assertEquals(2,service.getAllAccountDetails().size());
	 }
	 @Test
	 public void deleteAccountTest() {
		   @SuppressWarnings("deprecation")
		Account account= new Account(12,"1",5000,"Saving","Active", new Date(2022, 11, 9));
		   when(repo.findById(account.getAccountNumber())).thenReturn(Optional.of(account));
	      String response=service.deleteAccount(account.getAccountNumber());
		   assertEquals(response,"Branch with Id: " + "12" + " deleted!");
		   
	 }
	 
}
