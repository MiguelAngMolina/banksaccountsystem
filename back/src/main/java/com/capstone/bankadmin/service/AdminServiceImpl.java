package com.capstone.bankadmin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.bankadmin.model.Admin;
import com.capstone.bankadmin.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminRepository repo;
	@Override
	public boolean authenticateAdmin(Admin admin) {
		Admin dbAdmin = repo.findByUserId(admin.getUserId());
		if(dbAdmin != null) {
			System.out.println(admin);
			System.out.println(dbAdmin);
			if(dbAdmin.getUserId().equals(admin.getUserId()) && dbAdmin.getPassword().equals(admin.getPassword()))
				return true;
			else
				return false;
		}
		else
			return false;

	}

	@Override
	public Admin createAdmin(Admin admin) {
		return repo.save(admin);
	}

}
