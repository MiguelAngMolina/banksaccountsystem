package com.capstone.bankadmin.model;

import java.sql.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "customer_master")

public class Customer {
	
	@Id
	@Column(name="customer_number")
	private int customerNumber;
	
	@Column(name="firstname")
	private String firstName;
	
	@Column(name="middlename")
	private String middleName;
	
	@Column(name="lastname")
	private String lastName;
	
	@Column(name="customer_city")
	private String customerCity;
	
	@Column(name="customer_contact_no")
	private String customerContactNo;
	
	@Column(name="occupation")
	private String occupation;
	
	@Column(name="customer_date_of_birth")
	private Date customerDateOfBirth;
	
	@JsonIgnore
	@OneToMany(mappedBy="customer", cascade = CascadeType.ALL)
	private Set<Account> accounts;
	
	public Customer() {}
	
	public Customer(int customerNumber, String firstName, String middleName, String lastName,
			String customerCity, String customerContactNo, String occupation, Date customerDateOfBirth) {
		super();
		this.customerNumber = customerNumber;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.customerCity = customerCity;
		this.customerContactNo = customerContactNo;
		this.occupation = occupation;
		this.customerDateOfBirth = customerDateOfBirth;
		
	}

	public int getCustomerNumber() {
		return customerNumber;
	}

	public void setCustomerNumber(int customerNumber) {
		this.customerNumber = customerNumber;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getCustomerCity() {
		return customerCity;
	}

	public void setCustomerCity(String customerCity) {
		this.customerCity = customerCity;
	}

	public String getCustomerContactNo() {
		return customerContactNo;
	}

	public void setCustomerContactNo(String customerContactNo) {
		this.customerContactNo = customerContactNo;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public Date getCustomerDateOfBirth() {
		return customerDateOfBirth;
	}

	public void setCustomerDateOfBirth(Date customerDateOfBirth) {
		this.customerDateOfBirth = customerDateOfBirth;
	}
	
	public Set<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(Set<Account> accounts) {
		this.accounts = accounts;
	}

	@Override
	public String toString() {
		return "Customer [customerNumber=" + customerNumber + ", firstName=" + firstName + ", middleName=" + middleName
				+ ", lastName=" + lastName + ", customerCity=" + customerCity + ", customerContactNo="
				+ customerContactNo + ", occupation=" + occupation + ", customerDateOfBirth=" + customerDateOfBirth
				+ ", accounts=" + accounts + "]";
	}
	
	
}
