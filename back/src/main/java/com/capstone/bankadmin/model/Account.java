package com.capstone.bankadmin.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "account_master")
public class Account {
	
	@Id
	@Column(name="account_number")
	private int accountNumber;
	
	@ManyToOne
	@JoinColumn(name="customer_number")
	private Customer customer;
	
	@Column(name="branch_id")
	private String branchId;
	
	@Column(name="opening_balance")
	private int openingBalance;
	
	@Column(name="account_type")
	private String accountType;
	
	@Column(name="account_status")
	private String accountStatus;
	
	@Column(name="account_opening_date")
	private Date accountOpeningDate;
	
	public Account () {	}
	
	public Account(int accountNumber, String branchId,
			int openingBalance, String accountType, String accountStatus, Date accountOpeningDate ) {
		super();
		this.accountNumber = accountNumber;
		this.branchId = branchId;
		this.openingBalance = openingBalance;
		this.accountType = accountType;
		this.accountStatus = accountStatus;
		this.accountOpeningDate = accountOpeningDate;
	}

	public int getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(int accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getBranchId() {
		return branchId;
	}

	public void setBranchId(String branchId) {
		this.branchId = branchId;
	}

	public int getOpeningBalance() {
		return openingBalance;
	}

	public void setOpeningBalance(int openingBalance) {
		this.openingBalance = openingBalance;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

	public String getAccountStatus() {
		return accountStatus;
	}

	public void setAccountStatus(String accountStatus) {
		this.accountStatus = accountStatus;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	public Date getAccountOpeningDate() {
		return accountOpeningDate;
	}

	public void setAccountOpeningDate(Date accountOpeningDate) {
		this.accountOpeningDate = accountOpeningDate;
	}

	@Override
	public String toString() {
		return "Account [accountNumber=" + accountNumber + ", customer=" + customer + ", branchId=" + branchId
				+ ", openingBalance=" + openingBalance + ", accountType=" + accountType + ", accountStatus="
				+ accountStatus + "]";
	}
	
	

}
