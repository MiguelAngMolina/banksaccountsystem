package com.capstone.bankadmin.service;
import java.util.List;
import java.util.Optional;

import com.capstone.bankadmin.exception.NotFoundException;
import com.capstone.bankadmin.model.Customer;


public interface CustomerService {
       public List<Customer> getAllData();
       public String deleteCustomer(int id) throws NotFoundException;
       public Optional<Customer> getCustomerByNumber(int customerNumber);
}
