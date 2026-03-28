package com.example.demo.controller;

import com.example.demo.dto.booking.BookingRequestDTO;
import com.example.demo.dto.booking.BookingResponseDTO;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.User;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.BookingService;
import com.example.demo.service.PaymentService;
import com.example.demo.service.UserService;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;
    private final BookingService bookingService;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public PaymentController(PaymentService paymentService,
                             BookingService bookingService,
                             JwtUtil jwtUtil,
                             UserService userService) {
        this.paymentService = paymentService;
        this.bookingService = bookingService;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    // Step 1: Frontend calls this to get Razorpay order ID
    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Integer> body) {
        try {
            int amount = body.get("amount");
            JSONObject order = paymentService.createOrder(amount);
            return ResponseEntity.ok(order.toMap());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to create order: " + e.getMessage()));
        }
    }

    // Step 2: Frontend calls this after payment success to verify + confirm booking
    @PostMapping("/verify")
    public ResponseEntity<?> verifyAndBook(
            @RequestBody Map<String, Object> body,
            @RequestHeader("Authorization") String token) {

        String razorpayOrderId = (String) body.get("razorpayOrderId");
        String razorpayPaymentId = (String) body.get("razorpayPaymentId");
        String razorpaySignature = (String) body.get("razorpaySignature");

        // Verify payment signature
        boolean isValid = paymentService.verifyPayment(
                razorpayOrderId, razorpayPaymentId, razorpaySignature);

        if (!isValid) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Payment verification failed"));
        }

        // Payment verified — now create booking
        try {
            String email = jwtUtil.extractEmail(token.substring(7));
            User user = userService.getUserByEmail(email)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            // Extract bookingData from request body
            @SuppressWarnings("unchecked")
            Map<String, Object> bookingData = (Map<String, Object>) body.get("bookingData");

            BookingRequestDTO requestDTO = new BookingRequestDTO();
            requestDTO.setBusId(Long.valueOf(bookingData.get("busId").toString()));
            requestDTO.setSeatNumbers((java.util.List<String>) bookingData.get("seatNumbers"));
            requestDTO.setPassengers(
                    convertPassengers(bookingData.get("passengers")));
            requestDTO.setTotalFare(
                    Double.parseDouble(bookingData.get("totalFare").toString()));
            requestDTO.setTravelDate(
                    java.time.LocalDate.parse(bookingData.get("travelDate").toString()));

            BookingResponseDTO booking = bookingService.createBooking(user.getId(), requestDTO);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "bookingId", booking.getId(),
                    "message", "Booking confirmed"
            ));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Booking failed: " + e.getMessage()));
        }
    }

    private java.util.List<com.example.demo.model.PassengerInfo> convertPassengers(Object raw) {
        java.util.List<Map<String, Object>> list = (java.util.List<Map<String, Object>>) raw;
        return list.stream().map(p -> {
            com.example.demo.model.PassengerInfo passenger = new com.example.demo.model.PassengerInfo();
            passenger.setName((String) p.get("name"));
            passenger.setAge(Integer.parseInt(p.get("age").toString()));
            passenger.setGender((String) p.get("gender"));
            return passenger;
        }).toList();
    }
}