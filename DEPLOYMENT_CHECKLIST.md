# Vercel Deployment Checklist: Contact Form Email

Use this checklist to ensure your contact form works on production (https://www.emcobe.net).

## Pre-Deployment ✓

- [ ] Code changes committed to `main` branch
- [ ] API file `api/contact.ts` reviewed and contains logging
- [ ] Frontend files updated (`ContactSection.tsx`, `ContactPage.tsx`)
- [ ] `vercel.json` has correct `/api/(.*)` rewrite

## Environment Variables (CRITICAL) ✓

These MUST be set on Vercel or the API will fail with 500 errors.

### Step 1: Get Gmail App Password

- [ ] Go to https://myaccount.google.com/apppasswords
- [ ] Ensure 2-Step Verification is enabled on your Gmail account
- [ ] Select App: **Mail** | Device: **Windows Computer**
- [ ] Copy the generated 16-character password (remove spaces)

### Step 2: Set Vercel Environment Variables

- [ ] Go to https://vercel.com/dashboard/[your-project]
- [ ] Navigate to: **Settings** → **Environment Variables**
- [ ] Add variable **Mail**:
  - Name: `Mail`
  - Value: `your-email@gmail.com` (sender address)
  - Environments: ✓ Production ✓ Preview ✓ Development
- [ ] Add variable **Mail_App_Password**:
  - Name: `Mail_App_Password`
  - Value: `xxxxxxxxxxxxxxxx` (16-char app password, no spaces)
  - Environments: ✓ Production ✓ Preview ✓ Development
- [ ] Click **Save** for each variable

## Deployment ✓

- [ ] Push code: `git push origin main`
  - OR manually trigger redeploy in Vercel dashboard
- [ ] Wait for deployment to complete (check **Deployments** tab)
- [ ] Verify build succeeded (no errors in logs)

## Testing ✓

### Test 1: Basic Form Submission

- [ ] Visit https://www.emcobe.net/contact
- [ ] Fill out form with test data
- [ ] Submit
- [ ] Should see success message: "Your message has been sent successfully"

### Test 2: Email Received

- [ ] Check inbox of the email address set in `Mail`
- [ ] Look for email with subject: `New Contact Form Submission from [Name]`
- [ ] If not found, check **Spam** or **Promotions** folder
- [ ] Email should contain sender's name, email, and message

### Test 3: Check API Response (Browser DevTools)

- [ ] Open browser DevTools (F12)
- [ ] Go to **Network** tab
- [ ] Submit contact form again
- [ ] Find POST request to `/api/contact`
- [ ] Check **Response** tab, should be valid JSON:
  ```json
  {
    "success": true,
    "message": "Email sent successfully",
    "messageId": "..."
  }
  ```

### Test 4: Check Vercel Logs (Optional, for troubleshooting)

- [ ] Go to https://vercel.com/dashboard/[your-project]
- [ ] Click **Deployments**
- [ ] Click latest deployment
- [ ] Click **Logs** or **Function Logs**
- [ ] Should see console output like:
  ```
  Contact API called. Environment check: { hasMAIL: true, hasMAIL_APP_PASSWORD: true, ... }
  Creating Gmail transporter for your-email@gmail.com
  Sending email from your-email@gmail.com to your-email@gmail.com...
  Email sent successfully. MessageID: <...>
  ```

## Troubleshooting ❌→✓

### Issue: Still seeing "Failed to send email" with 500 error

**Step 1:** Verify env vars are set
- [ ] Vercel Dashboard → Settings → Environment Variables
- [ ] Both `Mail` and `Mail_App_Password` are present
- [ ] Click **Save** to ensure changes applied

**Step 2:** Redeploy
- [ ] Click **Deployments** → Latest → **Redeploy**
- [ ] OR: `git push origin main` (triggers auto-deploy)
- [ ] Wait for new deployment to complete

**Step 3:** Check logs for specific error
- [ ] Deployments → Latest → Logs
- [ ] Look for `console.error()` output
- [ ] Error message should indicate the actual problem

### Issue: "Email configuration incomplete" error

- [ ] `Mail` is set but `Mail_App_Password` is not
- [ ] **Solution:** Set both env vars on Vercel

### Issue: "Invalid login credentials" or SMTP error

- [ ] App password is incorrect or has spaces
- [ ] 2-Step Verification not enabled on Gmail account
- [ ] **Solution:** 
  - [ ] Go to https://myaccount.google.com/apppasswords
  - [ ] Regenerate app password and set on Vercel (no spaces)
  - [ ] Redeploy

### Issue: Email sent but not received

- [ ] Check spam/junk folder
- [ ] Verify `Mail` address matches Gmail account used for authentication
- [ ] Gmail may block repeated emails from same sender; try different test email in form
- [ ] Check Gmail Activity at https://myaccount.google.com/device-activity

## Rollback (if needed) ⚠️

If you need to revert to a previous deployment:

- [ ] Go to https://vercel.com/dashboard/[your-project]
- [ ] Deployments tab
- [ ] Find previous working deployment
- [ ] Click → **Promote to Production**

---

## Success! ✅

Once tests pass:

- [ ] Contact form is fully functional
- [ ] Emails are being sent and received
- [ ] Users get clear success/error messages
- [ ] Production is ready

**Estimated time to completion:** 10-15 minutes
