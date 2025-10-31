package com.example.demo.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendBookingConfirmation(String toEmail, String bookingId, String bookingDetails) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            
            helper.setTo(toEmail);
            helper.setSubject("Bus Ticket Booking Confirmation");
            
            // HTML Email Content
            String htmlContent = "<html><body>"
                + "<h2>Booking Confirmation</h2>"
                + "<p>Thank you for booking your ticket.</p>"
                + "<p><b>Booking ID:</b> " + bookingId + "</p>"
                + "<p><b>Details:</b> " + bookingDetails + "</p>"
                + "<p>Enjoy your trip!</p>"
                + "</body></html>";

            helper.setText(htmlContent, true);  // Enable HTML

            mailSender.send(message);
            System.out.println("Email sent successfully!");

        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }
}
