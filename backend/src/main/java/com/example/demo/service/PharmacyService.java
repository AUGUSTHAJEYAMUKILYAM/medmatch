// package com.example.demo.service;

// import com.example.demo.model.Pharmacy;
// import com.example.demo.repository.PharmacyRepository;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class PharmacyService {

//     private final PharmacyRepository repository;

//     public PharmacyService(PharmacyRepository repository) {
//         this.repository = repository;
//     }

//     public List<Pharmacy> getAllPharmacies() {
//         return repository.findAll();
//     }
//     public Pharmacy getPharmacyById(Long id) {
//     return repository.findById(id)
//             .orElseThrow(() -> new RuntimeException("Pharmacy not found"));
// }

//     public List<Pharmacy> searchPharmacies(String keyword) {
//         return repository.findByCityContainingIgnoreCaseOrPincode(keyword, keyword);
//     }

//     public Pharmacy savePharmacy(Pharmacy pharmacy) {
//         return repository.save(pharmacy);
//     }

//     public Pharmacy updatePharmacy(Long id, Pharmacy details) {

//         Pharmacy pharmacy = repository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Pharmacy not found"));

//         pharmacy.setName(details.getName());
//         pharmacy.setAddress(details.getAddress());
//         pharmacy.setCity(details.getCity());
//         pharmacy.setPincode(details.getPincode());
//         pharmacy.setPhone(details.getPhone());
//         pharmacy.setLatitude(details.getLatitude());
//         pharmacy.setLongitude(details.getLongitude());
//         pharmacy.setOpeningHours(details.getOpeningHours());

//         return repository.save(pharmacy);
//     }

//     public void deletePharmacy(Long id) {
//         repository.deleteById(id);
//     }
// }
package com.example.demo.service;

import com.example.demo.model.Pharmacy;
import com.example.demo.repository.PharmacyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PharmacyService {

    private final PharmacyRepository repository;

    public PharmacyService(PharmacyRepository repository) {
        this.repository = repository;
    }

    public List<Pharmacy> getAllPharmacies() {
        return repository.findAll();
    }

    public Pharmacy getPharmacyById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Pharmacy not found"));
    }

    public List<Pharmacy> searchPharmacies(String keyword) {
        return repository.findByCityContainingIgnoreCaseOrPincode(
                keyword,
                keyword
        );
    }

    public Pharmacy savePharmacy(Pharmacy pharmacy) {
        return repository.save(pharmacy);
    }

    public Pharmacy updatePharmacy(
            Long id,
            Pharmacy details) {

        Pharmacy pharmacy = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Pharmacy not found"));

        pharmacy.setName(details.getName());
        pharmacy.setAddress(details.getAddress());
        pharmacy.setCity(details.getCity());
        pharmacy.setPincode(details.getPincode());
        pharmacy.setPhone(details.getPhone());
        pharmacy.setLatitude(details.getLatitude());
        pharmacy.setLongitude(details.getLongitude());
        pharmacy.setOpeningHours(details.getOpeningHours());

        return repository.save(pharmacy);
    }

    public void deletePharmacy(Long id) {
        repository.deleteById(id);
    }
}