import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // If request body is raw string, parse it
    let body: any = req.body;
    if (typeof body === 'string' && body.trim().length) {
      try {
        body = JSON.parse(body);
      } catch (err) {
        console.warn('Failed to parse request body as JSON, falling back to raw string');
        body = { message: body };
      }
    }
    const { firstName, lastName, email, phone, company, message } = body || {};

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Simple email format validation
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get environment variables
    const MAIL = process.env.Mail;
    const MAIL_APP_PASSWORD = process.env.Mail_App_Password;

    if (!MAIL || !MAIL_APP_PASSWORD) {
      console.error('Missing email configuration');
      res.setHeader('Content-Type', 'application/json');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: MAIL,
        pass: MAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: MAIL,
      to: MAIL,
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151; margin-bottom: 15px;">Contact Information:</h3>
            
            <p style="margin: 8px 0;">
              <strong>Name:</strong> ${firstName} ${lastName}
            </p>
            
            <p style="margin: 8px 0;">
              <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
            </p>
            
            ${phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
            
            ${company ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${company}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151; margin-bottom: 15px;">Message:</h3>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
              ${message}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This email was sent from the EMCOBE contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
