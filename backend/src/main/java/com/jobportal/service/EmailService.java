package com.jobportal.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    
    @Value("${spring.mail.username:}")
    private String fromEmail;
    
    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    public void sendPasswordResetEmail(String to, String resetToken) {
        try {
            // Email sending is optional - if mail sender is not configured, just log
            logger.info("Password reset email would be sent to: {} with token: {}", to, resetToken);
            logger.info("Reset link: {}/reset-password?token={}", frontendUrl, resetToken);
            // Note: To enable actual email sending, configure spring.mail.* properties
            // and uncomment the mail sending code below
            /*
            if (mailSender != null) {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(fromEmail);
                message.setTo(to);
                message.setSubject("Đặt lại mật khẩu - Job Portal");
                message.setText("Xin chào,\n\n" +
                        "Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng click vào link sau để đặt lại mật khẩu:\n\n" +
                        frontendUrl + "/reset-password?token=" + resetToken + "\n\n" +
                        "Link này sẽ hết hạn sau 1 giờ.\n\n" +
                        "Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.\n\n" +
                        "Trân trọng,\n" +
                        "Job Portal Team");
                mailSender.send(message);
            }
            */
        } catch (Exception e) {
            logger.error("Failed to send password reset email to: {}", to, e);
        }
    }

    public void sendWelcomeEmail(String to, String displayName) {
        try {
            logger.info("Welcome email would be sent to: {} for user: {}", to, displayName);
            // Note: To enable actual email sending, configure spring.mail.* properties
        } catch (Exception e) {
            logger.error("Failed to send welcome email to: {}", to, e);
        }
    }

    public void sendNotificationEmail(String to, String title, String message, String link) {
        try {
            logger.info("Notification email would be sent to: {} with title: {}", to, title);
            // Note: To enable actual email sending, configure spring.mail.* properties
        } catch (Exception e) {
            logger.error("Failed to send notification email to: {}", to, e);
        }
    }
}
