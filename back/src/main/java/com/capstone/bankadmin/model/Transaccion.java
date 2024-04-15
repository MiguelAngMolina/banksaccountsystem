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


    public String getFromAccount() {
        return toAccount != null ? toAccount.getAccountId() : null; 
    }


    public void setFromAccount(Cuenta fromAccount) {
        this.fromAccount = fromAccount;
    }



    public String getToAccount() {
        return fromAccount != null ? fromAccount.getAccountId() : null; 
    }


    public void setToAccount(Cuenta toAccount) {
        this.toAccount = toAccount;
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
                '}';
    }


    public Transaccion() {
    }

    public Transaccion(String transactionNumber, Cuenta fromAccount, Cuenta toAccount, Date date, Double amount) {

        super();
        this.transactionNumber = transactionNumber;
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
        this.date = date;
        this.amount = amount;
    }
}
