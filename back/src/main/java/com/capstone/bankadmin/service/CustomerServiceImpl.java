package com.capstone.bankadmin.service;

import java.util.List;

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
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public String deleteCustomer(int id) throws NotFoundException{
		
		// TODO Auto-generated method stub
		String  customerId=String.valueOf(id);
		Customer c=repo.findById(id).orElseThrow(()->new NotFoundException("Customer with Id: "+customerId+" not found"));
		repo.deleteById(c.getCustomerNumber());
		return (String)("customer with id: "+customerId+" deleted!"); 
		
	}
	
	@ExceptionHandler(value = NotFoundException.class)
	public ResponseEntity<String> handleNotFoundException(NotFoundException ex) {
		System.out.println(ex.getMessage());
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

}
