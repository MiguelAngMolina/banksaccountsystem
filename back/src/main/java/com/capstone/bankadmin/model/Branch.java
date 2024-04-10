 package com.capstone.bankadmin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "branch_master")
public class Branch {

	@Id
	@Column(name="branch_id")
	private int branchId;
	
	@Column(name="branch_name")
	private String branchName;
	
	@Column(name="branch_city")
	private String branchCity;
	
	public Branch() {}

	public Branch(int branchId, String branchName, String branchCity) {
		super();
		this.branchId = branchId;
		this.branchName = branchName;
		this.branchCity = branchCity;
	}

	public int getBranchId() {
		return branchId;
	}

	public void setBranchId(int branchId) {
		this.branchId = branchId;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getBranchCity() {
		return branchCity;
	}

	public void setBranchCity(String branchCity) {
		this.branchCity = branchCity;
	}

	@Override
	public String toString() {
		return "Branch [branchId=" + branchId + ", branchName=" + branchName + ", branchCity=" + branchCity + "]";
	}
	
	
}
