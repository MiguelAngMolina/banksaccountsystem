package com.capstone.bankadmin.model;

import javax.persistence.*;

@Entity
@Table(name = "Administradores")
public class Administrador {

    @Id
	@Column(name = "user_id")
	private String userId;
	
	@Column(name="password")
	private String password;
	
	public Administrador() {}

	public Administrador(String userId, String password) {
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
