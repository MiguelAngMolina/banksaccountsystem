package com.capstone.bankadmin.service;
import java.util.List;
import java.util.Optional;

import com.capstone.bankadmin.exception.NotFoundException;
import com.capstone.bankadmin.model.Customer;


public interface CustomerService {
       public List<Customer> getAllData();
       public Optional<Customer> getCustomerByNumber(int customerNumber);
       public Customer createCustomer(Customer customer);
       public void deleteCustomer(int customerNumber) throws NotFoundException;
       public Customer updateCustomer(int customerNumber, Customer customer) throws NotFoundException;
}
