package com.capstone.bankadmin.dto;

import java.util.Date;

public class TransaccionDTO {
    private String transactionNumber;
    private String fromAccountId;
    private String toAccountId;
    private String fromUserName;
    private String toUserName;
    private Date date;
    private Double amount;


    // Getters y setters

    public String getTransactionNumber() {
        return transactionNumber;
    }


    public void setTransactionNumber(String transactionNumber) {
        this.transactionNumber = transactionNumber;
    }


    public String getFromAccountId() {
        return fromAccountId;
    }


    public void setFromAccountId(String fromAccountId) {
        this.fromAccountId = fromAccountId;
    }


    public String getToAccountId() {
        return toAccountId;
    }


    public void setToAccountId(String toAccountId) {
        this.toAccountId = toAccountId;
    }


    public String getFromUserName() {
        return fromUserName;
    }


    public void setFromUserName(String fromUserName) {
        this.fromUserName = fromUserName;
    }


    public String getToUserName() {
        return toUserName;
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
    

}
