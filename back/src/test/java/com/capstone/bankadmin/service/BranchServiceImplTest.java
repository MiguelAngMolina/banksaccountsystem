package com.capstone.bankadmin.service;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.capstone.bankadmin.model.Branch;
import com.capstone.bankadmin.repository.BranchRepository;

@SpringBootTest
class BranchServiceImplTest {
	
	@Mock
	private BranchRepository repo;
	
	@InjectMocks
	private BranchServiceImpl service;
	
	
	@DisplayName("Should Create Branch")
	@Test
	public void shouldAddBranchtest() {
		Branch testBranch = getBranchDetails();
		when(repo.save(testBranch)).thenReturn(testBranch);
		
		Boolean result = service.createBranch(testBranch);
		assertTrue(result);
	}
	
	@DisplayName("Should Not Create Branch")
	@Test
	public void shouldNotAddedBranchtest() {
		Branch testBranch = getBranchDetails();
		when(repo.save(testBranch)).thenReturn(null);
		
		Boolean result = service.createBranch(testBranch);
		assertFalse(result);
	}
	
	private Branch getBranchDetails() {
		return new Branch(2, "TestBranch", "TestCity");
	}

}
