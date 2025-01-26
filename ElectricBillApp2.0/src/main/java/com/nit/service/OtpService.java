package com.nit.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class OtpService {

	 @Autowired
	    private JavaMailSender mailSender;

	    private Map<String, String> otpStorage = new HashMap<>();

	    public void sendOtp(String email) {
	        String otp = String.valueOf(new Random().nextInt(900000) + 100000); // 6-digit OTP
	        otpStorage.put(email, otp);

	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(email);
	        message.setSubject("Your OTP for Registration");
	        message.setText("Your OTP is: " + otp);
	        mailSender.send(message);
	    }

	    public boolean verifyOtp(String email, String enteredOtp) {
	        return otpStorage.containsKey(email) && otpStorage.get(email).equals(enteredOtp);
	    }
}
