const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for contact messages (in production, use a database)
let contactMessages = [];

// Email configuration
const createTransporter = () => {
  if (process.env.EMAIL_SERVICE && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransporter({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
  return null;
};

// Validation middleware
const validateContactForm = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  const errors = {};

  // Name validation
  if (!name || name.trim().length < 2) {
    errors.name = 'Name is required and must be at least 2 characters';
  }

  // Email validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Valid email is required';
  }

  // Subject validation
  if (!subject || subject.trim().length < 5) {
    errors.subject = 'Subject is required and must be at least 5 characters';
  }

  // Message validation
  if (!message || message.trim().length < 10) {
    errors.message = 'Message is required and must be at least 10 characters';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Backend API',
    version: '1.0.0',
    endpoints: {
      'POST /api/contact': 'Submit contact form',
      'GET /api/messages': 'Get all contact messages (admin)',
      'GET /api/health': 'Health check'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Contact form submission
app.post('/api/contact', validateContactForm, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Create contact message object
    const contactMessage = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.get('User-Agent')
    };

    // Store message
    contactMessages.push(contactMessage);

    // Try to send email notification
    const transporter = createTransporter();
    if (transporter) {
      try {
        const emailOptions = {
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <hr>
            <p><small>Sent at: ${contactMessage.timestamp}</small></p>
          `
        };

        await transporter.sendMail(emailOptions);
        console.log('Email notification sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError.message);
        // Don't fail the request if email fails
      }
    }

    res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      data: {
        id: contactMessage.id,
        timestamp: contactMessage.timestamp
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// Admin endpoint to view messages (basic implementation)
app.get('/api/messages', (req, res) => {
  // In production, add proper authentication here
  const { password } = req.query;
  
  if (password !== process.env.ADMIN_PASSWORD && password !== 'admin123') {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access'
    });
  }

  res.json({
    success: true,
    messages: contactMessages.map(msg => ({
      ...msg,
      ip: undefined, // Hide IP for privacy
      userAgent: undefined // Hide user agent for privacy
    })),
    total: contactMessages.length
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}`);
  
  if (!process.env.EMAIL_SERVICE) {
    console.log('⚠️  Email configuration not found. Contact form will work but emails won\'t be sent.');
    console.log('   To enable emails, create a .env file with EMAIL_SERVICE, EMAIL_USER, and EMAIL_PASS');
  }
});