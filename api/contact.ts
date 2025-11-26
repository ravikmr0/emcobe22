// Lightweight request/response types compatible with Vercel/Express-like serverless handlers
type VercelRequest = {
  method?: string | undefined;
  body?: any;
  headers?: Record<string, string | undefined>;
  query?: any;
  cookies?: Record<string, string | undefined>;
};

type VercelResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): VercelResponse;
  json(body: any): VercelResponse;
  end?(chunk?: any, encoding?: string): void;
};
import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse body (in case some runtime delivers raw string)
    let body: any = req.body;
    if (typeof body === 'string' && body.trim().length) {
      try {
        body = JSON.parse(body);
      } catch (err) {
        // Accept raw string as the message
        body = { message: String(body) };
      }
    }

    const { firstName, lastName, email, phone, company, message } = body || {};

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Simple email format validation
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Get env vars; support multiple naming conventions
    const MAIL = process.env.Mail || process.env.MAIL;
    const MAIL_APP_PASSWORD = process.env.Mail_App_Password || process.env.MAIL_APP_PASSWORD;
    const OWNER_EMAIL = MAIL || (process.env.OWNER_EMAIL || 'mail@emcobe.net');

    // Log for debugging
    console.log('Contact API called. Environment check:', {
      hasMAIL: !!MAIL,
      hasMAIL_APP_PASSWORD: !!MAIL_APP_PASSWORD,
      OWNER_EMAIL,
      fromEmail: email,
    });

    let transporter: any = null;
    let usedTestAccount = false;

    // If MAIL is set but password isn't, don't silently fallback to ethereal in production
    if (MAIL && !MAIL_APP_PASSWORD) {
      const errMsg = 'Email password not configured. Mail is set but Mail_App_Password/MAIL_APP_PASSWORD is missing. Set both environment variables on your hosting provider.';
      console.error(errMsg);
      return res.status(500).json({ error: 'Email configuration incomplete', details: errMsg });
    }

    if (MAIL && MAIL_APP_PASSWORD) {
      // Use Gmail / real SMTP
      console.log(`Creating Gmail transporter for ${MAIL}`);
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: MAIL,
          pass: MAIL_APP_PASSWORD,
        },
      } as SMTPTransport.Options);
    } else {
      // Fallback: use Ethereal for development (won't deliver to actual recipients)
      console.warn('No MAIL or MAIL_APP_PASSWORD set. Using Ethereal test account (development mode). Emails will not be delivered to real recipients.');
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      } as SMTPTransport.Options);
      usedTestAccount = true;
    }

    // Compose email
    const fromAddress = MAIL ? `${MAIL}` : `${firstName} ${lastName} <no-reply@emcobe.net>`;
    const toAddress = OWNER_EMAIL;
    const replyToAddress = email;

    const mailOptions = {
      from: fromAddress,
      to: toAddress,
      replyTo: replyToAddress,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="margin: 20px 0;">
            <h3 style="color: #374151; margin-bottom: 15px;">Contact Information:</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
            ${company ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${company}</p>` : ''}
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #374151; margin-bottom: 15px;">Message:</h3>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</div>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This email was sent from the EMCOBE contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    // Send the email
    console.log(`Sending email from ${mailOptions.from} to ${mailOptions.to}...`);
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully. MessageID: ${info.messageId}`);

    const result: any = { success: true, message: 'Email sent successfully', messageId: info.messageId || null };
    if (usedTestAccount) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) result.previewUrl = previewUrl;
    }

    return res.status(200).json(result);
  } catch (err: any) {
    console.error('API /api/contact error:', err);
    const details = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: 'Failed to send email', details });
  }
}
