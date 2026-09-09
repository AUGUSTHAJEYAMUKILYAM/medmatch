// // package com.example.demo.service;

// // import com.example.demo.model.Prescription;
// // import com.example.demo.model.User;
// // import com.example.demo.repository.PrescriptionRepository;
// // import com.example.demo.repository.UserRepository;
// // import org.springframework.stereotype.Service;
// // import org.springframework.transaction.annotation.Transactional;

// // import java.util.List;

// // @Service
// // public class PrescriptionService {

// //     private final PrescriptionRepository prescriptionRepository;
// //     private final UserRepository userRepository;

// //     public PrescriptionService(
// //             PrescriptionRepository prescriptionRepository,
// //             UserRepository userRepository) {

// //         this.prescriptionRepository = prescriptionRepository;
// //         this.userRepository = userRepository;
// //     }

// //     @Transactional
// //     public Prescription savePrescription(
// //             String fileUrl,
// //             String notes,
// //             String username) {

// //         User user = userRepository.findByUsername(username)
// //                 .orElseThrow(() ->
// //                         new RuntimeException("User not found"));

// //         Prescription prescription = new Prescription();

// //         prescription.setFileUrl(fileUrl);
// //         prescription.setNotes(notes);

// //         // Attach the existing database user
// //         User existingUser = userRepository.getReferenceById(user.getId());
// //         prescription.setUser(existingUser);

// //         return prescriptionRepository.save(prescription);
// //     }

// //     @Transactional(readOnly = true)
// //     public List<Prescription> getPrescriptions(String username) {

// //         User user = userRepository.findByUsername(username)
// //                 .orElseThrow(() ->
// //                         new RuntimeException("User not found"));

// //         return prescriptionRepository.findByUser(user);
// //     }

// //     @Transactional
// //     public void deletePrescription(Long id) {
// //         prescriptionRepository.deleteById(id);
// //     }
// // }package com.example.demo.service;

// import com.example.demo.model.Prescription;
// import com.example.demo.model.User;
// import com.example.demo.repository.PrescriptionRepository;
// import com.example.demo.repository.UserRepository;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import java.util.List;

// @Service
// public class PrescriptionService {

//     private final PrescriptionRepository prescriptionRepository;
//     private final UserRepository userRepository;

//     public PrescriptionService(
//             PrescriptionRepository prescriptionRepository,
//             UserRepository userRepository) {

//         this.prescriptionRepository = prescriptionRepository;
//         this.userRepository = userRepository;
//     }

//     // --------------------------------------------------
//     // SAVE PRESCRIPTION
//     // --------------------------------------------------

//     @Transactional
//     public Prescription savePrescription(
//             String fileUrl,
//             String notes,
//             String username) {

//         User user = userRepository.findByUsername(username)
//                 .orElseThrow(() ->
//                         new RuntimeException("User not found"));

//         Prescription prescription = new Prescription();

//         prescription.setFileUrl(fileUrl);
//         prescription.setNotes(notes);

//         // Attach the existing database user
//         User existingUser =
//                 userRepository.getReferenceById(user.getId());

//         prescription.setUser(existingUser);

//         return prescriptionRepository.save(prescription);
//     }

//     // --------------------------------------------------
//     // GET USER'S PRESCRIPTIONS
//     // --------------------------------------------------

//     @Transactional(readOnly = true)
//     public List<Prescription> getPrescriptions(String username) {

//         User user = userRepository.findByUsername(username)
//                 .orElseThrow(() ->
//                         new RuntimeException("User not found"));

//         return prescriptionRepository.findByUser(user);
//     }

//     // --------------------------------------------------
//     // DELETE PRESCRIPTION
//     // --------------------------------------------------

//     @Transactional
//     public void deletePrescription(
//             Long id,
//             String username) {

//         User user = userRepository.findByUsername(username)
//                 .orElseThrow(() ->
//                         new RuntimeException("User not found"));

//         Prescription prescription =
//                 prescriptionRepository.findById(id)
//                         .orElseThrow(() ->
//                                 new RuntimeException(
//                                         "Prescription not found"));

//         // Make sure this prescription belongs
//         // to the currently logged-in user
//         if (!prescription.getUser().getId()
//                 .equals(user.getId())) {

//             throw new RuntimeException(
//                     "You are not allowed to delete this prescription");
//         }

//         prescriptionRepository.delete(prescription);
//     }
// }
package com.example.demo.service;

import com.example.demo.model.Prescription;
import com.example.demo.model.User;
import com.example.demo.repository.PrescriptionRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final UserRepository userRepository;

    public PrescriptionService(
            PrescriptionRepository prescriptionRepository,
            UserRepository userRepository) {

        this.prescriptionRepository = prescriptionRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Prescription savePrescription(
            String fileUrl,
            String notes,
            String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Prescription prescription = new Prescription();

        prescription.setFileUrl(fileUrl);
        prescription.setNotes(notes);

        User existingUser =
                userRepository.getReferenceById(user.getId());

        prescription.setUser(existingUser);

        return prescriptionRepository.save(prescription);
    }

    @Transactional(readOnly = true)
    public List<Prescription> getPrescriptions(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return prescriptionRepository.findByUser(user);
    }

    @Transactional
    public void deletePrescription(
            Long id,
            String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Prescription prescription =
                prescriptionRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Prescription not found"));

        if (!prescription.getUser().getId()
                .equals(user.getId())) {

            throw new RuntimeException(
                    "You are not allowed to delete this prescription");
        }

        prescriptionRepository.delete(prescription);
    }
}