package com.capstone.bankadmin.model;

import javax.persistence.*;

@Entity
@Table(name = "Administradores")
public class Administrador {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "admin_id")
	private String userId;
	
	
	@Column(name = "username")
	private String username;
	
	@Column(name="password")
	private String password;
	
	public Administrador() {}

	public Administrador(String userId, String username, String password) {
		super();
		this.userId = userId;
		this.password = password;
		this.username = username;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "Admin [userId=" + userId + ", password=" + password + ", username=" + username + "]";
	}

}
