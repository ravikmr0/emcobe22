Contact Form / Email Setup

The app includes a contact form that sends data to a serverless function at `/api/contact` and uses nodemailer to email the submission. To make this work in development and production, set the following environment variables:

- `Mail` — the email address used as sender and recipient (e.g., `info@example.com`).
- `Mail_App_Password` — the application password or SMTP password for the email account (do NOT commit this to source control).

To test the API locally with curl (while the dev server is running):

```powershell
curl -X POST http://localhost:5173/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","message":"Test message"}'
```

If the request has been routed to an HTML page (for example, due to an incorrect rewrite configuration) you'll get a parse error in the browser like "Unexpected end of JSON input". We've added checks and clearer errors for this case; ensure your `vercel.json` keeps `/api/*` routed to the function and not rewritten to `/`.
