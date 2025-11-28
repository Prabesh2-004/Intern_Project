import express from "express";
import { sendEmail } from "../utils/sendEmail.js";


export const Contact = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  try {
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Name, email, and message are required" 
      });
    }

    await sendEmail({ name, email, phone, subject, message });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact route error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send message. Please try again later." 
    });
  }
}