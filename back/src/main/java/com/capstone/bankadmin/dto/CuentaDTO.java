package com.capstone.bankadmin.dto;


import com.capstone.bankadmin.model.Cuenta;

public class CuentaDTO {
    private String accountNumber;
    private Double balance;
    private Cuenta.AccountType accountType;
    private String userId;

    // Getters y setters para cada campo
    public String getAccountNumber() {
        return accountNumber;
    }
    
    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public Cuenta.AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(Cuenta.AccountType accountType) {
        this.accountType = accountType;
    }


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }


    

}
