package com.capstone.bankadmin.model;

import javax.persistence.*;

@Entity
@Table(name = "Cuentas")
public class Cuenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String account_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Usuario usuario;

    @Column(unique = true, nullable = false)
    private String accountNumber;

    @Column(nullable = false)
    private Double balance;

    public enum AccountType {
        ahorros, corriente;
    }
    
    public enum AccountStatus {
        habilitada, inhabilitada;
    }

    
    @Enumerated(EnumType.STRING)
    private AccountType account_type;

    @Enumerated(EnumType.STRING)
    private AccountStatus account_status;

    // Getters and Setters

    public String getAccountId() {
        return account_id;
    }

    public void setAccountId(String account_id) {
        this.account_id = account_id;
    }

    public Usuario getUsuario() {
        return usuario;
    }


    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getUserId() {
        return usuario != null ? usuario.getUserId() : null; 
    }

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

    

    public AccountType getAccountType() {
        return account_type;
    }
    
    public void setAccountType(AccountType account_type) {
        this.account_type = account_type;
    }
    
    public AccountStatus getAccountStatus() {
        return account_status;
    }
    
    public void setAccountStatus(AccountStatus account_status) {
        this.account_status = account_status;
    }
    
    @Override
    public String toString() {
        return "Cuenta{" +
                "account_id=" + account_id +
                ", usuario=" + usuario +
                ", account_number='" + accountNumber + '\'' +
                ", balance=" + balance +
                ", account_type='" + account_type + '\'' +
                ", account_status='" + account_status + '\'' +
                '}';
    }

    public Cuenta () {	}

    public Cuenta(String account_id, Usuario usuario, String accountNumber, Double balance, AccountType account_type, AccountStatus account_status) {
        super();
        this.account_id = account_id;
        this.usuario = usuario;
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.account_type = account_type;
        this.account_status = account_status;
    }

}
