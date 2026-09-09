// // package com.example.demo.controller;

// // import com.example.demo.model.Pharmacy;
// // import com.example.demo.service.PharmacyService;
// // import org.springframework.http.ResponseEntity;
// // import org.springframework.web.bind.annotation.*;

// // import java.util.List;

// // @RestController
// // @RequestMapping("/api/pharmacies")
// // public class PharmacyController {

// //     private final PharmacyService service;

// //     public PharmacyController(PharmacyService service) {
// //         this.service = service;
// //     }

// //     @GetMapping
// //     public List<Pharmacy> getAllPharmacies() {
// //         return service.getAllPharmacies();
// //     }

// //     @GetMapping("/{id}")
// //     public Pharmacy getPharmacy(@PathVariable Long id) {
// //         return service.getPharmacyById(id);
// //     }

// //     @PostMapping
// //     public Pharmacy addPharmacy(@RequestBody Pharmacy pharmacy) {
// //         return service.savePharmacy(pharmacy);
// //     }

// //     @PutMapping("/{id}")
// //     public Pharmacy updatePharmacy(
// //             @PathVariable Long id,
// //             @RequestBody Pharmacy pharmacy) {

// //         return service.updatePharmacy(id, pharmacy);
// //     }

// //     @DeleteMapping("/{id}")
// //     public ResponseEntity<Void> deletePharmacy(@PathVariable Long id) {

// //         service.deletePharmacy(id);

// //         return ResponseEntity.noContent().build();
// //     }
// // }package com.example.demo.controller;

// import com.example.demo.model.Prescription;
// import com.example.demo.service.PrescriptionService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/prescriptions")
// public class PrescriptionController {

//     private final PrescriptionService service;

//     public PrescriptionController(PrescriptionService service) {
//         this.service = service;
//     }

//     // --------------------------------------------------
//     // UPLOAD PRESCRIPTION
//     // --------------------------------------------------

//     @PostMapping
//     public Prescription uploadPrescription(
//             @RequestParam String fileUrl,
//             @RequestParam(
//                     required = false,
//                     defaultValue = ""
//             ) String notes,
//             Authentication authentication) {

//         String username = authentication.getName();

//         return service.savePrescription(
//                 fileUrl,
//                 notes,
//                 username
//         );
//     }

//     // --------------------------------------------------
//     // GET USER'S PRESCRIPTIONS
//     // --------------------------------------------------

//     @GetMapping
//     public List<Prescription> getPrescriptions(
//             Authentication authentication) {

//         String username = authentication.getName();

//         return service.getPrescriptions(username);
//     }

//     // --------------------------------------------------
//     // DELETE PRESCRIPTION
//     // --------------------------------------------------

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deletePrescription(
//             @PathVariable Long id,
//             Authentication authentication) {

//         String username = authentication.getName();

//         service.deletePrescription(id, username);

//         return ResponseEntity.noContent().build();
//     }
// }
package com.example.demo.controller;

import com.example.demo.model.Pharmacy;
import com.example.demo.service.PharmacyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacies")
public class PharmacyController {

    private final PharmacyService service;

    public PharmacyController(PharmacyService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pharmacy> getAllPharmacies() {
        return service.getAllPharmacies();
    }

    @GetMapping("/{id}")
    public Pharmacy getPharmacy(@PathVariable Long id) {
        return service.getPharmacyById(id);
    }

    @PostMapping
    public Pharmacy addPharmacy(@RequestBody Pharmacy pharmacy) {
        return service.savePharmacy(pharmacy);
    }

    @PutMapping("/{id}")
    public Pharmacy updatePharmacy(
            @PathVariable Long id,
            @RequestBody Pharmacy pharmacy) {

        return service.updatePharmacy(id, pharmacy);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePharmacy(
            @PathVariable Long id) {

        service.deletePharmacy(id);

        return ResponseEntity.noContent().build();
    }
}