package com.capstone.bankadmin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.capstone.bankadmin.exception.NotFoundException;
import com.capstone.bankadmin.model.Customer;
import com.capstone.bankadmin.repository.CustomerRepository;


@Service
public class CustomerServiceImpl implements CustomerService{
	
    @Autowired
    CustomerRepository repo;
	@Override
	public List<Customer>getAllData() {
		return repo.findAll();
	}

	public void deleteCustomer(int customerNumber) throws NotFoundException {
        Customer customer = repo.findById(customerNumber)
            .orElseThrow(() -> new NotFoundException("Customer not found with ID: " + customerNumber));
        
			repo.delete(customer);
    }
	
	@ExceptionHandler(value = NotFoundException.class)
	public ResponseEntity<String> handleNotFoundException(NotFoundException ex) {
		System.out.println(ex.getMessage());
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

	public Optional<Customer> getCustomerByNumber(int customerNumber) {
        return repo.findById(customerNumber);
    }

	@Override
	public Customer createCustomer(Customer customer) {
		return repo.save(customer);
	}

	@Override
	public Customer updateCustomer(int customerNumber, Customer customer) throws NotFoundException {
		Customer existingCustomer = repo.findById(customerNumber)
				.orElseThrow(() -> new NotFoundException("Customer not found with ID: " + customerNumber));
		existingCustomer.setFirstName(customer.getFirstName());
		existingCustomer.setMiddleName(customer.getMiddleName());
		existingCustomer.setLastName(customer.getLastName());
		existingCustomer.setCustomerCity(customer.getCustomerCity());
		existingCustomer.setCustomerContactNo(customer.getCustomerContactNo());
		existingCustomer.setOccupation(customer.getOccupation());
		existingCustomer.setCustomerDateOfBirth(customer.getCustomerDateOfBirth());
		
		return repo.save(existingCustomer);
	}

		

	

	

}
