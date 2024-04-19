package com.capstone.bankadmin.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.capstone.bankadmin.model.Cuenta;
import com.capstone.bankadmin.repository.CuentaRepository;
import com.capstone.bankadmin.model.Usuario;
import com.capstone.bankadmin.model.Cuenta.AccountType;

@SpringBootTest
public class AccountServiceTest {

    @Mock
    private CuentaRepository repo;
    
    @InjectMocks
    private CuentaService service;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
public void getAllAccountDetailsTest() {
    Usuario mockUsuario = new Usuario(); // Asumiendo que tienes una clase Usuario con un constructor sin argumentos.
    when(repo.findAll()).thenReturn(List.of(
            new Cuenta("12", mockUsuario, "123456", 5000.0, AccountType.ahorros),
            new Cuenta("13", mockUsuario, "654321", 15000.0, AccountType.ahorros)
    ));
    assertEquals(2, service.findAllCuentas().size());
}

    
    @Test
    public void deleteAccountTest() {
        String accountId = "12";
        doNothing().when(repo).deleteById(accountId);
        service.deleteCuenta(accountId);
        verify(repo, times(1)).deleteById(accountId);
    }
}
