Contact Form / Email Setup

The app includes a contact form that sends data to a serverless function at `/api/contact` and uses `nodemailer` to email the submission. On Vercel you should set the following Environment Variables (Project Settings → Environment Variables):

- `SMTP_USER` — the SMTP username (typically the full mailbox address). Example: `mail@emcobe.net`.
- `SMTP_PASS` — the SMTP password or app password for the mailbox (do NOT commit this to source control).
- `SMTP_HOST` — SMTP host, default `smtp.office365.com` (optional).
- `SMTP_PORT` — SMTP port, default `587` (optional).
- `SMTP_SECURE` — `true` or `false` (optional). For Office 365 use `false` and port `587`.
- `MAIL_FROM` — optional explicit sender address (falls back to `SMTP_USER`). Example: `mail@emcobe.net`.
- `MAIL_TO` — optional recipient address (falls back to `MAIL_FROM`).

In production (Vercel) `SMTP_USER` and `SMTP_PASS` are required. Office 365 commonly requires the `from` address to match the authenticated mailbox; the API will prefer the authenticated `SMTP_USER` when necessary.

To test the API locally with curl (while the dev server is running):

```powershell
curl -X POST http://localhost:5173/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","message":"Test message"}'
```

If the request has been routed to an HTML page (for example, due to an incorrect rewrite configuration) you'll get a parse error in the browser like "Unexpected end of JSON input". We've added checks and clearer errors for this case; ensure your `vercel.json` keeps `/api/*` routed to the function and not rewritten to `/`.
