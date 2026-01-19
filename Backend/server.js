import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://shyamraj-portfolio.netlify.app",
}));

app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Portfolio Contact",
          email: "shyamdeepu1998@gmail.com", // must be verified in Brevo
        },
        to: [{ email: "shyamdeepu1998@gmail.com" }],
        subject: "New Portfolio Inquiry",
        htmlContent: `
          <h2>New Contact Form Submission</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
      }
    );

    res.json({
      success: true,
      message: "Message sent successfully!",
    });

  } catch (error) {
    console.error("Brevo error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
