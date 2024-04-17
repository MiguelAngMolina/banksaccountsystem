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

import com.capstone.bankadmin.model.Administrador;
import com.capstone.bankadmin.repository.AdministradorRepository;

@SpringBootTest
public class AdminServiceTest {
	
	@Mock
	private AdministradorRepository repo;
	
	@InjectMocks
	private AdministradorService service;
	
	@DisplayName("Should authenticate admin")
	@Test
	public void shouldAuthenticateAdmin() {
		Administrador testAdmin = getAdmin();
		when(repo.findByUserId(testAdmin.getUserId())).thenReturn(testAdmin);
		
		boolean result = service.authenticateAdmin(testAdmin);
		assertTrue(result);
	}
	
	@DisplayName("Should not authenticate admin")
	@Test
	public void shouldNotAuthenticateAdmin() {
		when(repo.findByUserId(anyString())).thenReturn(null);
		
		boolean result = service.authenticateAdmin(new Administrador("fakeUser", "fakeUsername", "fakePassword"));
		assertFalse(result);
	}
	
	private Administrador getAdmin() {
		return new Administrador("admin", "admin", "admin");
	}
}
