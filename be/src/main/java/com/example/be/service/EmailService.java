package com.example.be.service;

import com.example.be.repository.PuertoRepository;
import com.example.be.repository.RutaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.example.be.model.Reserva;

import jakarta.mail.internet.MimeMessage;

import java.math.BigDecimal;

@Service
public class EmailService implements I_EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Lee el email "from" desde application.properties
    @Value("${spring.mail.username}")
    private String fromEmail;

    @Async // <-- ¡Muy importante! Esto hace que se ejecute en otro hilo
    @Override
    public void sendReservationConfirmation(Reserva reserva, String origenNombre, String destinoNombre, double tarifa) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();

            // Usamos MimeMessageHelper para enviar HTML
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            // URL Base del Backend (ajusta si es necesario)
            String baseUrl = "http://localhost:8080"; // Asumiendo que tu backend corre en 8080

            // Construir el link de cancelación
            String cancellationLink = baseUrl + "/api/public/cancelReserva?token=" + reserva.getCancellationToken();

            // Construir el cuerpo del correo en HTML
            String htmlBody = String.format("""
                <html>
                <body>
                    <h3>¡Gracias por tu reserva en DrakeIn, %s!</h3>
                    <p>Hemos confirmado tu reservación con los siguientes detalles:</p>
                    <ul>
                        <li><b>Reserva #</b>%d</li>
                        <li><b>Nombre:</b> %s</li>
                        <li><b>Origen:</b> %s</li>
                        <li><b>Destino:</b> %s</li>
                        <li><b>Precio:</b> ₡%,.2f</li>
                    </ul>
                    <p>Si necesitas cancelar tu reservación, puedes hacerlo en el siguiente enlace:</p>
                    <p><a href="%s"><b>Cancelar mi Reserva</b></a></p>
                    <br/>
                    <p>¡Gracias por usar DrakeIn!</p>
                </body>
                </html>
                """,
                    reserva.getNombre(),
                    reserva.getId(),
                    reserva.getNombre(),
                    origenNombre,
                    destinoNombre,
                    tarifa,
                    cancellationLink
            );

            helper.setText(htmlBody, true); // true indica que es HTML
            helper.setTo(reserva.getCorreo());
            helper.setSubject("Confirmación de Reserva - DrakeIn #" + reserva.getId());
            helper.setFrom(fromEmail);

            mailSender.send(mimeMessage);

        } catch (Exception e) {
            // Manejo de error (al menos un log)
            // Como es asíncrono, no podemos lanzar la excepción al controlador
            System.err.println("Error al enviar email: " + e.getMessage());
        }
    }
}