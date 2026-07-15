package com.example.demo.service;

import com.example.demo.model.Prescription;
import com.example.demo.model.User;
import com.example.demo.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PrescriptionService {

    private final PrescriptionRepository repository;

    public PrescriptionService(PrescriptionRepository repository) {
        this.repository = repository;
    }

    public List<Prescription> getPrescriptionsByUser(User user) {
        return repository.findByUser(user);
    }

    public Prescription savePrescription(String fileUrl,
                                         String notes,
                                         User user) {

        Prescription prescription = new Prescription();

        prescription.setFileUrl(fileUrl);
        prescription.setNotes(notes);
        prescription.setUploadDate(LocalDateTime.now());
        prescription.setUser(user);

        return repository.save(prescription);
    }

    public void deletePrescription(Long id) {
        repository.deleteById(id);
    }
}package com.example.demo.service;

import com.example.demo.model.Medicine;
import com.example.demo.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {

    private final MedicineRepository repository;

    public MedicineService(MedicineRepository repository) {
        this.repository = repository;
    }

    public List<Medicine> getAllMedicines() {
        return repository.findAll();
    }

    public Medicine getMedicineById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
    }

    public List<Medicine> searchMedicines(String keyword) {
        return repository.findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCase(keyword, keyword);
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