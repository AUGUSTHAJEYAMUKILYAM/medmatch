package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "medicines")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String genericName;

    @Column(nullable = false)
    private String manufacturer;

    private String dosageForm;

    private String strength;

    @Column(length = 1000)
    private String description;

    private String category;

    private boolean inStock;

    // No-Argument Constructor
    public Medicine() {
    }

    // All-Argument Constructor
    public Medicine(Long id, String name, String genericName,
                    String manufacturer, String dosageForm,
                    String strength, String description,
                    String category, boolean inStock) {
        this.id = id;
        this.name = name;
        this.genericName = genericName;
        this.manufacturer = manufacturer;
        this.dosageForm = dosageForm;
        this.strength = strength;
        this.description = description;
        this.category = category;
        this.inStock = inStock;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGenericName() {
        return genericName;
    }

    public void setGenericName(String genericName) {
        this.genericName = genericName;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getDosageForm() {
        return dosageForm;
    }

    public void setDosageForm(String dosageForm) {
        this.dosageForm = dosageForm;
    }

    public String getStrength() {
        return strength;
    }

    public void setStrength(String strength) {
        this.strength = strength;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public boolean isInStock() {
        return inStock;
    }

    public void setInStock(boolean inStock) {
        this.inStock = inStock;
    }
}