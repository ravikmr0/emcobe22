// api/contact.ts - Gmail SMTP Configuration
import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

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

function sanitizeForHtml(input: string | undefined): string {
  if (!input) return '';
  // Basic sanitizer: escape <, >, &, " — good for form content
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Always return JSON
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Parse body if string
    let body: any = req.body;
    if (typeof body === 'string' && body.trim().length) {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = { message: String(body) };
      }
    }

    const { firstName, lastName, email, phone, company, message } = body || {};

    // Basic validation - require firstName, email and message; lastName is optional
    if (!firstName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: firstName, email, message' });
    }

    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(String(email))) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Gmail SMTP Environment Variables (set these in Vercel)
    const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
    const SMTP_SECURE = process.env.SMTP_SECURE === 'true'; // typically false for port 587 (STARTTLS)
    const SMTP_USER = process.env.SMTP_USER || process.env.MAIL_FROM; // the authenticated mailbox (required in production)
    const SMTP_PASS = process.env.SMTP_PASS; // app password or SMTP password
    const MAIL_FROM = process.env.MAIL_FROM || SMTP_USER || 'emcobesteel@gmail.com';
    const MAIL_TO = process.env.MAIL_TO || MAIL_FROM || SMTP_USER || 'emcobesteel@gmail.com';

    console.log('Contact API called. Env check:', {
      NODE_ENV: process.env.NODE_ENV,
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      hasSMTP_USER: !!SMTP_USER,
      hasSMTP_PASS: !!SMTP_PASS,
      MAIL_TO,
      fromEmail: email,
    });

    // In production do not fallback to Ethereal — require real SMTP credentials
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

    let transporter: nodemailer.Transporter | null = null;
    let usedTestAccount = false;

    if (SMTP_USER && SMTP_PASS) {
      // Use Gmail SMTP with TLS
      transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE, // false for 587, true for 465
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
        tls: {
          // Relaxed TLS settings for better compatibility
          rejectUnauthorized: false,
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000,
        socketTimeout: 15000,
      } as SMTPTransport.Options);
    } else {
      if (isProduction) {
        // Production without proper credentials -> clear error
        const errMsg =
          'Email configuration missing. Set SMTP_USER and SMTP_PASS (and optionally MAIL_FROM, MAIL_TO) in your Vercel environment variables.';
        console.error(errMsg, { SMTP_USER: !!SMTP_USER, SMTP_PASS: !!SMTP_PASS });
        return res.status(500).json({ error: 'Email configuration incomplete', details: errMsg });
      } else {
        // Development: create and use Ethereal test account
        console.warn('No SMTP credentials configured; using Ethereal test account (development only).');
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
    }

    if (!transporter) {
      return res.status(500).json({ error: 'Failed to create email transporter' });
    }

    // Skip verification - Gmail sometimes fails verify() but still sends successfully
    // We'll catch any real errors during sendMail() instead
    console.log('Transporter created, skipping verification to avoid Gmail verify issues.');

    // Sanitize inputs that will go into HTML
    const sFirstName = sanitizeForHtml(String(firstName));
    const sLastName = sanitizeForHtml(lastName ? String(lastName) : '');
    const sEmail = sanitizeForHtml(String(email));
    const sPhone = sanitizeForHtml(phone ? String(phone) : '');
    const sCompany = sanitizeForHtml(company ? String(company) : '');
    const sMessage = sanitizeForHtml(String(message));

    // Compose email HTML
    const mailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Contact Form Submission</h2>
        <div style="margin: 20px 0;">
          <h3 style="color: #374151; margin-bottom: 15px;">Contact Information:</h3>
          <p style="margin: 8px 0;"><strong>Name:</strong> ${sFirstName} ${sLastName}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${sEmail}">${sEmail}</a></p>
          ${sPhone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${sPhone}</p>` : ''}
          ${sCompany ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${sCompany}</p>` : ''}
        </div>
        <div style="margin: 20px 0;">
          <h3 style="color: #374151; margin-bottom: 15px;">Message:</h3>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${sMessage}</div>
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p>This email was sent from the EMCOBE contact form.</p>
          <p>Submitted on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    // For Gmail, the `from` address should ideally match the authenticated user
    // Prefer MAIL_FROM (explicit env var). If it conflicts with SMTP_USER we'll use SMTP_USER to avoid rejection.
    let fromAddress = MAIL_FROM || SMTP_USER || 'emcobesteel@gmail.com';
    const toAddress = MAIL_TO;
    if (SMTP_USER && fromAddress.toLowerCase() !== SMTP_USER.toLowerCase()) {
      console.warn('MAIL_FROM differs from SMTP_USER; using SMTP_USER as from address to satisfy Gmail.', {
        MAIL_FROM,
        SMTP_USER,
      });
      fromAddress = SMTP_USER;
    }
    const replyToAddress = sEmail || undefined;

    const mailOptions = {
      from: fromAddress,
      to: toAddress,
      replyTo: replyToAddress,
      subject: `New Contact Form Submission from ${sFirstName} ${sLastName}`,
      html: mailHtml,
    };

    console.log(`Sending email from ${mailOptions.from} to ${mailOptions.to}...`);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email send result:', { messageId: info.messageId, accepted: (info as any).accepted });

    const result: any = { success: true, message: 'Email sent successfully', messageId: info.messageId || null };
    if (usedTestAccount) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) result.previewUrl = previewUrl;
    }

    return res.status(200).json(result);
  } catch (err: any) {
    console.error('API /api/contact error:', err);
    const errorMessage = err?.message || String(err);
    
    // Provide user-friendly error messages for common SMTP issues
    let userFriendlyError = 'Failed to send email';
    let details = errorMessage;
    
    if (errorMessage.includes('Invalid login') || errorMessage.includes('535') || errorMessage.includes('Authentication unsuccessful') || errorMessage.includes('Username and Password not accepted')) {
      userFriendlyError = 'Email authentication failed';
      details = 'Invalid SMTP credentials. For Gmail: 1) Enable 2-Step Verification on your Google account, 2) Create an App Password at https://myaccount.google.com/apppasswords, 3) Use the App Password (not your regular password) as SMTP_PASS.';
    } else if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('ETIMEDOUT') || errorMessage.includes('ENOTFOUND')) {
      userFriendlyError = 'Cannot connect to email server';
      details = 'Unable to connect to the SMTP server. Please check SMTP_HOST and SMTP_PORT settings.';
    } else if (errorMessage.includes('certificate') || errorMessage.includes('TLS') || errorMessage.includes('SSL')) {
      userFriendlyError = 'Secure connection failed';
      details = 'SSL/TLS connection error. Try setting SMTP_SECURE to false for port 587.';
    } else if (errorMessage.includes('Less secure app') || errorMessage.includes('BadCredentials')) {
      userFriendlyError = 'Gmail security block';
      details = 'Gmail requires an App Password. Go to https://myaccount.google.com/apppasswords to create one (requires 2-Step Verification enabled).';
    }
    
    return res.status(500).json({ error: userFriendlyError, details });
  }
}
