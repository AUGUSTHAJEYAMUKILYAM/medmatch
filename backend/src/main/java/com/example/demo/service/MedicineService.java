package com.example.demo.service;

import com.example.demo.model.Medicine;
import com.example.demo.repository.MedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicineService {

    private final MedicineRepository repository;

    public List<Medicine> getAllMedicines() {
        return repository.findAll();
    }

    public Medicine getMedicineById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
    }

    public List<Medicine> searchMedicines(String keyword) {
        return repository
                .findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCase(
                        keyword, keyword);
    }

    public Medicine saveMedicine(Medicine medicine) {
        return repository.save(medicine);
    }

    public Medicine updateMedicine(Long id, Medicine medicineDetails) {

        Medicine medicine = getMedicineById(id);

        medicine.setName(medicineDetails.getName());
        medicine.setGenericName(medicineDetails.getGenericName());
        medicine.setManufacturer(medicineDetails.getManufacturer());
        medicine.setDosageForm(medicineDetails.getDosageForm());
        medicine.setStrength(medicineDetails.getStrength());
        medicine.setDescription(medicineDetails.getDescription());
        medicine.setCategory(medicineDetails.getCategory());
        medicine.setInStock(medicineDetails.isInStock());

        return repository.save(medicine);
    }

    public void deleteMedicine(Long id) {
        repository.deleteById(id);
    }
}