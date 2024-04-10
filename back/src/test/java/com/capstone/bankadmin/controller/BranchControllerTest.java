package com.capstone.bankadmin.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.hasSize;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.capstone.bankadmin.model.Branch;
import com.capstone.bankadmin.service.BranchServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
public class BranchControllerTest {

	@Mock
	private BranchServiceImpl branchService;
	
	@InjectMocks
	private BranchController branchController;
	
	private MockMvc mvc;
	
	@BeforeEach
	public void setUp() {
		new ObjectMapper();
		this.mvc = MockMvcBuilders.standaloneSetup(branchController).build();
	}
	
	@DisplayName("Should display all branch details")
	@Test
	public void shouldDisplayBranch() throws Exception {
		String url = "/branch/";
		when(branchService.getAllBranchDetails()).thenReturn(getAllBranch());
		
		mvc.perform(get(url))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$[0].branchId").value(1))
			.andExpect(jsonPath("$[0].branchName").value("hdfc"))
			.andExpect(jsonPath("$[0].branchCity").value("chennai"))
			.andExpect(jsonPath("$", hasSize(2)));
			
	}
	
	private List<Branch> getAllBranch() {
		List<Branch> branchList = new ArrayList<>();
		branchList.add(new Branch(1, "hdfc", "chennai"));
		branchList.add(new Branch(2, "sbi", "bangalore"));
		return branchList;
	}
}
