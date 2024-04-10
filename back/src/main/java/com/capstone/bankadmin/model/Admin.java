package com.capstone.bankadmin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name= "admin")
public class Admin {
	
	@Id
	@Column(name = "user_id")
	private String userId;
	
	@Column(name="password")
	private String password;
	
	public Admin() {}

	public Admin(String userId, String password) {
		super();
		this.userId = userId;
		this.password = password;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "Admin [userId=" + userId + ", password=" + password + "]";
	}
	
	
}
