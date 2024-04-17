package com.capstone.bankadmin.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Transacciones")
public class Transaccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String transaction_id;

    @Column(unique = true, nullable = false)
    private String transactionNumber;

    @ManyToOne
    @JoinColumn(name = "from_account_id", nullable = false)
    private Cuenta fromAccount;

    @ManyToOne
    @JoinColumn(name = "to_account_id", nullable = false)
    private Cuenta toAccount;

    @Transient 
    private String fromUserName;

    @Transient 
    private String toUserName;

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private Double amount;



    // Getters and Setters

    public String getTransactionId() {
        return transaction_id;
    }


    public void setTransactionId(String transaction_id) {
        this.transaction_id = transaction_id;
    }


    public String getTransactionNumber() {
        return transactionNumber;
    }


    public void setTransactionNumber(String transactionNumber) {
        this.transactionNumber = transactionNumber;
    }


    public Cuenta getFromAccount() {
        return fromAccount;
    }


    public void setFromAccount(Cuenta fromAccount) {
        this.fromAccount = fromAccount;
    }


    public Cuenta getToAccount() {
        return toAccount;
    }


    public void setToAccount(Cuenta toAccount) {
        this.toAccount = toAccount;
    }



    public String getFromUserName() {
        return fromAccount != null ? fromAccount.getUsuario().getLastName() : null;
    }

    public void setFromUserName(String fromUserName) {
        this.fromUserName = fromUserName;
    }

    public String getToUserName() {
        return toAccount != null ? toAccount.getUsuario().getLastName() : null;
    }

    public void setToUserName(String toUserName) {
        this.toUserName = toUserName;
    }



    public Date getDate() {
        return date;
    }


    public void setDate(Date date) {
        this.date = date;
    }


    public Double getAmount() {
        return amount;
    }


    public void setAmount(Double amount) {
        this.amount = amount;
    }


    @Override

    public String toString() {
        return "Transaccion{" +
                "transaction_id=" + transaction_id +
                ", transaction_number='" + transactionNumber + '\'' +
                ", fromAccount=" + fromAccount +
                ", toAccount=" + toAccount +
                ", date=" + date +
                ", amount=" + amount +
                ", fromUserName='" + fromUserName + '\'' +
                ", toUserName='" + toUserName + '\'' +
                '}';
    }


    public Transaccion() {
    }


    public Transaccion(String transactionNumber, Cuenta fromAccount, Cuenta toAccount, String fromUserName, String toUserName ,  Date date, Double amount) {
        this.transactionNumber = transactionNumber;
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
        this.fromUserName = fromUserName;
        this.toUserName = toUserName;
        this.date = date;
        this.amount = amount;
    }


}
