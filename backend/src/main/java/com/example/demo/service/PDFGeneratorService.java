//// PDFGeneratorService.java
//package com.example.demo.service;
//
//import com.example.demo.model.Booking;
//
//import com.google.zxing.BarcodeFormat;
//import com.google.zxing.WriterException;
//import com.google.zxing.common.BitMatrix;
//import com.google.zxing.qrcode.QRCodeWriter;
//import com.itextpdf.io.image.ImageDataFactory;
//import com.itextpdf.kernel.pdf.PdfDocument;
//import com.itextpdf.kernel.pdf.PdfWriter;
//import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
//import com.itextpdf.layout.Document;
//import com.itextpdf.layout.element.*;
//import com.itextpdf.layout.property.HorizontalAlignment;
//import com.itextpdf.layout.property.TextAlignment;
//import com.itextpdf.layout.property.UnitValue;
//
//import jakarta.annotation.PostConstruct;
//
//import org.springframework.stereotype.Service;
//
//import javax.imageio.ImageIO;
//import java.awt.image.BufferedImage;
//import java.io.ByteArrayOutputStream;
//import java.time.format.DateTimeFormatter;
//
//
//
//@Service
//public class PDFGeneratorService {
//
//	@PostConstruct
//	public void testITextLoading() {
//	    System.out.println("✅ PDFGeneratorService loaded. Testing iText...");
//	    try {
//	        Document dummy = new Document(new PdfDocument(new PdfWriter(new ByteArrayOutputStream())));
//	        System.out.println("✅ iText dependencies working fine!");
//	    } catch (Exception e) {
//	        System.err.println("❌ iText dependency issue: " + e.getMessage());
//	    }
//	}
//    public byte[] generateTicketPDF(Booking booking) {
//    	System.out.println("✅ iText dependencies loaded successfully!");
//        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
//            PdfWriter writer = new PdfWriter(baos);
//            PdfDocument pdf = new PdfDocument(writer);
//            Document document = new Document(pdf);
//
//            // Add Title
//            document.add(new Paragraph("EasyTrip Bus Ticket")
//                    .setFontSize(22)
//                    .setBold()
//                    .setTextAlignment(TextAlignment.CENTER));
//            document.add(new LineSeparator(new SolidLine()));
//
//            // Booking Info Table
//            Table table = new Table(UnitValue.createPercentArray(new float[]{35, 65}))
//                    .setWidth(UnitValue.createPercentValue(100))
//                    .setMarginTop(10);
//
//            table.addCell(cell("Passenger Name:", true));
//            table.addCell(cell(booking.getUser().getName(), false));
//
//            table.addCell(cell("Bus Name:", true));
//            table.addCell(cell(booking.getBusRoute().getBusName(), false));
//
//            table.addCell(cell("Route:", true));
//            table.addCell(cell(booking.getBusRoute().getStartLocation() + " ➔ " + booking.getBusRoute().getEndLocation(), false));
//
//            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");
//            table.addCell(cell("Date & Time:", true));
//            table.addCell(cell(dtf.format(booking.getBusRoute().getStartDateTime()), false));
//
//            table.addCell(cell("Seats:", true));
//            table.addCell(cell(String.join(", ", booking.getSeatNumbers()), false));
//
//            table.addCell(cell("Fare:", true));
//            table.addCell(cell("INR ₹" + booking.getTotalFare(), false));
//
//            table.addCell(cell("Booking ID:", true));
//            table.addCell(cell(booking.getId().toString(), false));
//
//            document.add(table);
//
//            // QR Code
//            byte[] qrImage = generateQRCode("BookingID:" + booking.getId() +
//                    ", User:" + booking.getUser().getName() +
//                    ", Bus:" + booking.getBusRoute().getBusName() +
//                    ", Seats:" + String.join(",", booking.getSeatNumbers()));
//
//            if (qrImage != null) {
//                Image qr = new Image(ImageDataFactory.create(qrImage))
//                        .setWidth(120)
//                        .setHeight(120)
//                        .setHorizontalAlignment(HorizontalAlignment.CENTER);
//                document.add(new Paragraph("\nScan for Details").setTextAlignment(TextAlignment.CENTER).setFontSize(10));
//                document.add(qr);
//            }
//
//            // Footer
//            document.add(new Paragraph("\nThank you for choosing EasyTrip!")
//                    .setTextAlignment(TextAlignment.CENTER).setFontSize(12));
//            document.add(new Paragraph("Contact: support@easytrip.com")
//                    .setTextAlignment(TextAlignment.CENTER).setFontSize(10));
//
//            document.close();
//            return baos.toByteArray();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//
//    private byte[] generateQRCode(String data) {
//        try {
//            QRCodeWriter qrWriter = new QRCodeWriter();
//            BitMatrix matrix = qrWriter.encode(data, BarcodeFormat.QR_CODE, 150, 150);
//            BufferedImage image = new BufferedImage(150, 150, BufferedImage.TYPE_INT_RGB);
//
//            for (int x = 0; x < 150; x++) {
//                for (int y = 0; y < 150; y++) {
//                    image.setRGB(x, y, matrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF);
//                }
//            }
//
//            ByteArrayOutputStream out = new ByteArrayOutputStream();
//            ImageIO.write(image, "png", out);
//            return out.toByteArray();
//        } catch (WriterException | java.io.IOException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//
//    private Cell cell(String text, boolean bold) {
//        Paragraph p = new Paragraph(text);
//        if (bold) p.setBold();
//        return new Cell().add(p);
//    }
//}
