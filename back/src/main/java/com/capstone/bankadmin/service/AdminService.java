package com.capstone.bankadmin.service;

import com.capstone.bankadmin.model.Admin;

public interface AdminService {
	public boolean authenticateAdmin(Admin admin);
	public Admin createAdmin(Admin admin);
}
