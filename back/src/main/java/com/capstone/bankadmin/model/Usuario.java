package com.capstone.bankadmin.model;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String userId;

    @Column
    private String first_name;

    @Column
    private String last_name;

    @Column
    private Date birth_date;

    @Column
    private String city;

    @Column
    private String contact_number;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String occupation;

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return first_name;
    }

    public void setFirstName(String first_name) {
        this.first_name = first_name;
    }

    public String getLastName() {
        return last_name;
    }

    public void setLastName(String last_name) {
        this.last_name = last_name;
    }

    public Date getBirthDate() {
        return birth_date;
    }

    public void setBirthDate(Date birth_date) {
        this.birth_date = birth_date;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getContactNumber() {
        return contact_number;
    }

    public void setContactNumber(String contact_number) {
        this.contact_number = contact_number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }



    @Override
    public String toString() {
        return "Usuario{" +
                "user_id=" + userId +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", birth_date=" + birth_date +
                ", city='" + city + '\'' +
                ", contact_number='" + contact_number + '\'' +
                ", email='" + email + '\'' +
                ", occupation='" + occupation + '\'' +
                '}';
    }

    public Usuario() {
    }



    public Usuario(String first_name, String last_name, Date birth_date, String city, String contact_number, String email, String occupation) {
        super();
        this.first_name = first_name;
        this.last_name = last_name;
        this.birth_date = birth_date;
        this.city = city;
        this.contact_number = contact_number;
        this.email = email;
        this.occupation = occupation;
    }
}
