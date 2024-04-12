package com.capstone.bankadmin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.bankadmin.exception.NotFoundException;
import com.capstone.bankadmin.model.Customer;
import com.capstone.bankadmin.service.CustomerService;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

	@Autowired
	CustomerService customerService;


	@GetMapping("/")
	public ResponseEntity<List<Customer>> showAllData(){
		 List<Customer>customerDetails=customerService.getAllData();
		 return new ResponseEntity<>(customerDetails,HttpStatus.OK);
	}

	
	@ExceptionHandler(value = NotFoundException.class)
	public ResponseEntity<String> handleNotFoundException(NotFoundException ex) {
		System.out.println(ex.getMessage());
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

    
    @GetMapping("/{customerNumber}")
	public ResponseEntity<Customer> getCustomer(@PathVariable int customerNumber) {
    Customer customer = customerService.getCustomerByNumber(customerNumber)
            .orElseThrow(() -> new NotFoundException("Customer with ID: " + customerNumber + " not found"));
    return new ResponseEntity<>(customer, HttpStatus.OK);
	}

	@PostMapping("/create")
	public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
    Customer savedCustomer = customerService.createCustomer(customer);
	return ResponseEntity.ok(savedCustomer);
	}

	@DeleteMapping("/{customerNumber}")
    public ResponseEntity<?> deleteCustomer(@PathVariable int customerNumber) {
        try {
            customerService.deleteCustomer(customerNumber);
            return ResponseEntity.ok().body("Customer deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting customer: " + e.getMessage());
        }
	}

	@PutMapping("/{customerNumber}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable int customerNumber, @RequestBody Customer customerDetails) {
    Customer updatedCustomer = customerService.updateCustomer(customerNumber, customerDetails);
    return ResponseEntity.ok(updatedCustomer);
}

}

