package com.capstone.bankadmin.controller;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import com.capstone.bankadmin.model.Admin;
import com.capstone.bankadmin.service.AdminServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
public class AdminControllerTest {

	@Mock
	private AdminServiceImpl adminService;
	
	@InjectMocks
	private AdminController adminController;
	
	private ObjectMapper objMapper;
	private MockMvc mvc;
	
	@BeforeEach
	public void setUp() {
		objMapper = new ObjectMapper();
		this.mvc = MockMvcBuilders.standaloneSetup(adminController).build();
	}
	
	@DisplayName("Should not authenticate admin")
	@Test
	public void shouldNotAuthenticateAdmin() throws Exception {
		String url = "/admin/";
		when(adminService.authenticateAdmin(getEmptyAdmin())).thenReturn(false);
		
		mvc.perform(post(url).contentType("application/json").content(objMapper.writeValueAsString(getEmptyAdmin())))
			.andExpect(status().isForbidden())
			.andExpect(content().string("false"));
			
	}

	
	private Admin getEmptyAdmin() {
		return new Admin();
	}
}
