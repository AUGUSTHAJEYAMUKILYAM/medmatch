package com.example.demo.dto;

import java.util.List;

public class InteractionCheckRequest {

    private List<Long> medicineIds;

    public InteractionCheckRequest() {
    }

    public InteractionCheckRequest(List<Long> medicineIds) {
        this.medicineIds = medicineIds;
    }

    public List<Long> getMedicineIds() {
        return medicineIds;
    }

    public void setMedicineIds(List<Long> medicineIds) {
        this.medicineIds = medicineIds;
    }
}