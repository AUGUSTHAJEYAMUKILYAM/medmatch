package com.example.demo.exception;

public class MedicineConflictException extends RuntimeException {

    public MedicineConflictException(String message) {
        super(message);
    }
}