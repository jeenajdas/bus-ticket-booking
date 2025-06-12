package com.example.demo.service;

import com.example.demo.model.Booking;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.property.TextAlignment;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import javax.imageio.ImageIO;

@Service // Marks this class as a Spring service component
public class PDFGeneratorService {

    /**
     * Generates a bus ticket PDF containing booking details and a QR code.
     * 
     * @param booking The booking information to be included in the PDF.
     * @return A byte array representing the generated PDF document.
     */
    public byte[] generateTicketPDF(Booking booking) {
        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            // Create a new PDF writer using an output stream
            PdfWriter writer = new PdfWriter(byteArrayOutputStream);
            PdfDocument pdfDocument = new PdfDocument(writer);
            Document document = new Document(pdfDocument);

            // Add ticket title to the PDF
            document.add(new Paragraph("Bus Ticket Confirmation")
                    .setBold().setFontSize(18).setTextAlignment(TextAlignment.CENTER));

            // Add booking details to the PDF
            document.add(new Paragraph("Booking ID: " + booking.getId()));
            document.add(new Paragraph("User: " + booking.getUser().getName()));
            document.add(new Paragraph("Bus Route: " + booking.getBusRoute().getBusName()));
            document.add(new Paragraph("Seats: " + booking.getNumberOfSeats()));
            document.add(new Paragraph("Total Fare: $" + booking.getTotalFare()));
            document.add(new Paragraph("Booking Time: " + booking.getBookingTime()));

            // Generate QR Code containing booking details
            byte[] qrCodeImage = generateQRCodeImage("Booking ID: " + booking.getId() + 
                    ", Bus: " + booking.getBusRoute().getBusName());
            
            if (qrCodeImage != null) {
                // Convert QR code byte array into an iText image and add it to the PDF
                ImageData qrImageData = ImageDataFactory.create(qrCodeImage);
                Image qrImage = new Image(qrImageData);
                qrImage.setWidth(150).setHeight(150).setTextAlignment(TextAlignment.CENTER);
                document.add(qrImage);
            }

            // Close the document and return the generated PDF as a byte array
            document.close();
            return byteArrayOutputStream.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Return null if an error occurs
        }
    }

    /**
     * Generates a QR code image from the provided text.
     * 
     * @param text The text to encode in the QR code.
     * @return A byte array containing the QR code image in PNG format.
     */
    private byte[] generateQRCodeImage(String text) {
        try {
            // Create a QR code writer
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, 150, 150);

            // Create a blank image for the QR code
            BufferedImage image = new BufferedImage(150, 150, BufferedImage.TYPE_INT_RGB);
            Graphics2D graphics = image.createGraphics();
            graphics.setColor(Color.WHITE);
            graphics.fillRect(0, 0, 150, 150);
            graphics.setColor(Color.BLACK);

            // Draw the QR code onto the image
            for (int x = 0; x < 150; x++) {
                for (int y = 0; y < 150; y++) {
                    if (bitMatrix.get(x, y)) {
                        graphics.fillRect(x, y, 1, 1);
                    }
                }
            }
            graphics.dispose(); // Clean up graphics resources

            // Convert the image into a byte array in PNG format
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(image, "png", outputStream);
            return outputStream.toByteArray();
        } catch (WriterException | java.io.IOException e) {
            e.printStackTrace();
            return null; // Return null if QR code generation fails
        }
    }
}
