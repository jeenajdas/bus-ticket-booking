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

            helper.setText(htmlContent, true);

            mailSender.send(message);
            System.out.println("Email sent successfully!");

        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }

    public void sendPasswordResetEmail(String toEmail, String token) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(toEmail);
            helper.setSubject("Password Reset Request");

            String resetLink = "http://localhost:5173/reset-password?token=" + token;
            String htmlContent = "<html><body>"
                    + "<h3>Password Reset Request</h3>"
                    + "<p>Click the link below to reset your password:</p>"
                    + "<a href=\"" + resetLink + "\">Reset Password</a>"
                    + "<p>This link expires in 15 minutes.</p>"
                    + "</body></html>";

            helper.setText(htmlContent, true);
            mailSender.send(message);
            System.out.println("Password reset email sent to " + toEmail);
        } catch (Exception e) {
            System.err.println("Error sending password reset email: " + e.getMessage());
        }
    }

}
