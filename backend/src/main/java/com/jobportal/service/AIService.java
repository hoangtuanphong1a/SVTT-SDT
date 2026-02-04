package com.jobportal.service;

import org.springframework.stereotype.Service;

@Service
public class AIService {

    public String analyzeCV(String cvContent) {
        // Basic CV analysis logic
        return "CV Analysis: " + cvContent.substring(0, Math.min(100, cvContent.length())) + "...";
    }

    public String matchCVWithJob(String cvContent, String jobDescription) {
        // Basic matching logic
        return "CV-Job Match Score: 85%";
    }

    public String getChatbotResponse(String userMessage) {
        // Basic chatbot response
        return "Chatbot: I'm here to help you with your job search. What can I assist you with today?";
    }
}