// api/contact.ts (replace your existing handler with this)
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

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: firstName, lastName, email, message' });
    }

    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(String(email))) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Environment variables (support multiple naming conventions)
    const MAIL = process.env.Mail || process.env.MAIL;
    const MAIL_APP_PASSWORD = process.env.Mail_App_Password || process.env.MAIL_APP_PASSWORD;
    const OWNER_EMAIL = process.env.OWNER_EMAIL || MAIL || 'mail@emcobe.net';

    console.log('Contact API called. Env check:', {
      NODE_ENV: process.env.NODE_ENV,
      hasMAIL: !!MAIL,
      hasMAIL_APP_PASSWORD: !!MAIL_APP_PASSWORD,
      OWNER_EMAIL,
      fromEmail: email,
    });

    // In production do not fallback to Ethereal — require real SMTP credentials
    const isProduction = process.env.NODE_ENV === 'production';

    let transporter: nodemailer.Transporter | null = null;
    let usedTestAccount = false;

    if (MAIL && MAIL_APP_PASSWORD) {
      // Use configured SMTP (Gmail example)
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: MAIL,
          pass: MAIL_APP_PASSWORD,
        },
      } as SMTPTransport.Options);
    } else {
      if (isProduction) {
        // Production without proper credentials -> clear error
        const errMsg =
          'Email configuration missing. Set MAIL (sender) and MAIL_APP_PASSWORD (app password) in your environment variables for production.';
        console.error(errMsg);
        return res.status(500).json({ error: 'Email configuration incomplete', details: errMsg });
      } else {
        // Development: create and use Ethereal test account
        console.warn('No MAIL configured; using Ethereal test account (development only).');
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

    // verify transporter connection/options (useful to surface config errors early)
    try {
      await transporter.verify();
      console.log('Transporter verified successfully.');
    } catch (verifyErr) {
      console.error('Transporter verification failed:', verifyErr);
      // If verification fails in development with Ethereal we continue because it should still work; but return clear error in prod
      if (isProduction) {
        return res.status(500).json({ error: 'SMTP verification failed', details: String(verifyErr) });
      }
    }

    // Sanitize inputs that will go into HTML
    const sFirstName = sanitizeForHtml(String(firstName));
    const sLastName = sanitizeForHtml(String(lastName));
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

    const fromAddress = MAIL ? `${MAIL}` : `${sFirstName} ${sLastName} <no-reply@emcobe.net>`;
    const toAddress = OWNER_EMAIL;
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
    const details = err instanceof Error ? err.message : String(err);
    // avoid leaking secrets in the error response; return useful but safe details
    return res.status(500).json({ error: 'Failed to send email', details: details });
  }
}
