package com.capstone.bankadmin.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.capstone.bankadmin.model.Admin;
import com.capstone.bankadmin.repository.AdminRepository;

@SpringBootTest
public class AdminServiceImplTest {
	
	@Mock
	private AdminRepository repo;
	
	@InjectMocks
	private AdminServiceImpl service;
	
	@DisplayName("Should authenticate admin")
	@Test
	public void shouldAuthenticateAdmin() {
		Admin testAdmin = getAdmin();
		when(repo.findByUserId(testAdmin.getUserId())).thenReturn(testAdmin);
		
		Boolean result = service.authenticateAdmin(testAdmin);
		assertTrue(result);
	}
	
	@DisplayName("Should not authenticate admin")
	@Test
	public void shouldNotAuthenticateAdmin() {
		when(repo.findByUserId(anyString())).thenReturn(null);
		
		Boolean result = service.authenticateAdmin(new Admin());
		assertFalse(result);
	}
	
	private Admin getAdmin() {
		return new Admin("admin", "admin");
	}
	
}
