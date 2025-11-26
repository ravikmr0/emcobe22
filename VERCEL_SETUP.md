# Setup Guide: Contact Form Email Configuration

## Local Development

### Option 1: Using Ethereal Test Account (Easiest for Dev/Testing)

1. Leave `Mail` and `Mail_App_Password` empty or unset.
2. Run the dev server:
   ```powershell
   npm run dev
   ```
3. Fill out the contact form or test via curl:
   ```powershell
   npm run test-contact
   # or
   node scripts/test-contact.js http://localhost:5173
   ```
4. The API will automatically create an Ethereal test account and return a `previewUrl` in the response.
5. Open the `previewUrl` in your browser to view the generated email.

### Option 2: Using Real Gmail Account (Local Testing with Real SMTP)

1. Create a `.env.local` file (in root, git-ignored):
   ```env
   Mail=your-email@gmail.com
   Mail_App_Password=your-16-char-app-password
   ```

2. Get a Gmail App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select Mail and Windows Computer (or your device type)
   - Generate a new 16-character app password
   - Copy it (without spaces) and paste into `.env.local`

3. Run the dev server:
   ```powershell
   npm run dev
   ```

4. Fill out the contact form or test:
   ```powershell
   npm run test-contact
   ```

5. The API will send via your real Gmail account. Check your inbox for the email.

---

## Production Deployment (Vercel)

### Prerequisites

- A Gmail account with 2-Step Verification enabled.
- A Gmail App Password (not your main password).

### Step 1: Create a Gmail App Password

1. Go to https://myaccount.google.com/apppasswords
2. Select:
   - **App:** Mail
   - **Device:** Windows Computer (or your device type)
3. Google will generate a 16-character password. **Copy it** (without spaces).
4. This is your `Mail_App_Password`.

### Step 2: Set Environment Variables on Vercel

1. Open your project on Vercel (https://vercel.com/dashboard)
2. Go to **Settings > Environment Variables**
3. Add two new variables:
   - **Name:** `Mail`
     - **Value:** `your-email@gmail.com` (the Gmail account that will send emails)
     - **Environments:** Production, Preview, Development (select all or as needed)
   - **Name:** `Mail_App_Password`
     - **Value:** Your 16-character app password (from Step 1, without spaces)
     - **Environments:** Production, Preview, Development

4. Click **Save**

### Step 3: Redeploy

After setting the env vars, redeploy your project:

```bash
git push
# Or manually trigger a redeploy in Vercel dashboard
```

Vercel will automatically pick up the new environment variables and restart the function.

### Step 4: Test

1. Visit your live contact form at https://www.emcobe.net/contact
2. Fill out and submit a message
3. You should receive an email at the address specified in `Mail`

---

## Troubleshooting

### Error: "Email configuration incomplete" or "Failed to send email"

**Cause:** `Mail` is set but `Mail_App_Password` is not.

**Solution:** Set both environment variables on Vercel (or in your `.env.local` for local dev).

### Error: "Invalid login credentials"

**Cause:** `Mail_App_Password` is incorrect or expired.

**Solution:**
- Verify the 16-character app password (without spaces).
- If you generated it a while ago, regenerate it: https://myaccount.google.com/apppasswords
- Ensure 2-Step Verification is enabled on your Gmail account.

### Email sent successfully but I don't receive it

**Possible Causes:**
- Check spam/junk folder.
- Verify the `Mail` address matches the Gmail account.
- Check Gmail logs: https://myaccount.google.com/device-activity

### Ethereal Preview URL is shown (but I expected a real email)

**Cause:** Environment variables are not set or not recognized by the API.

**Solution:**
- If in production (Vercel): Verify env vars are set in **Settings > Environment Variables** and redeploy.
- If local dev: This is expected behavior when no credentials are set. Open the preview URL to view the message.

### Still having issues?

Check the Vercel function logs:

1. Go to your Vercel dashboard
2. Select your project
3. Click **Deployments** and select the latest deployment
4. Click **Logs** or **Function Logs**
5. Look for `console.error()` or `console.log()` output from the API that shows what's failing

---

## How It Works

- **With env vars set:** The API uses your Gmail account to send real emails via nodemailer's Gmail service.
- **Without env vars:** The API falls back to an Ethereal test account (Nodemailer's free testing service). Emails are not delivered but a preview URL is returned so you can verify the message content.
- **Contact form requests are logged:** All submissions include debug info in Vercel logs (success/failure, message IDs, env var status).
