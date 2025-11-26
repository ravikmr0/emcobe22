# Contact Form 500 Error - Fixed ✅

## Problem

Users were seeing **"Failed to send email"** error in the UI and **500 (Internal Server Error)** in the browser console when submitting the contact form at `/api/contact`.

## Root Cause

The API was returning a 500 error because:

1. **Missing environment variables** (`Mail` and `Mail_App_Password`) on Vercel in production
2. **No helpful error messages** to diagnose what went wrong
3. **No fallback mechanism** for development/testing

---

## Solution Applied ✅

### 1. Enhanced API with Better Logging

The `/api/contact` handler now includes:

- **Detailed console logging** to help diagnose issues in Vercel function logs
- **Clearer error messages** that indicate what's misconfigured
- **Separate SMTP error handling** to show specific nodemailer failures
- **Debug info** about environment variable status

### 2. Ethereal Test Account Fallback

When `Mail` and `Mail_App_Password` are NOT set:

- The API automatically uses Nodemailer's free Ethereal test account
- Emails are generated and a preview URL is returned
- **Perfect for local development and testing**
- You can click the preview URL to view the generated email in your browser

### 3. Setup Documentation

Created two new files:

- **`.env.example`** — Example environment variables with descriptions
- **`VERCEL_SETUP.md`** — Complete step-by-step guide for Vercel production setup

### 4. Frontend Improvements

Contact form pages now:

- Show detailed error messages (including server details)
- Support preview URLs (if running in dev mode)
- Handle non-JSON responses gracefully (no more "Unexpected end of JSON input")

---

## How to Fix the 500 Error on Production

### Quick Fix (5 minutes)

1. **Generate a Gmail App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select Mail → Windows Computer
   - Copy the 16-character password

2. **Set Vercel Environment Variables:**
   - Go to https://vercel.com/dashboard/[your-project]
   - Settings → Environment Variables
   - Add:
     - `Mail` = `your-email@gmail.com`
     - `Mail_App_Password` = Your 16-char app password (no spaces)

3. **Redeploy:**
   ```bash
   git push
   # or trigger redeploy in Vercel dashboard
   ```

4. **Test:**
   - Visit https://www.emcobe.net/contact
   - Fill out and submit the form
   - Check your email inbox (or spam folder)

---

## Local Testing

### Option A: Ethereal Test Account (Easiest)

```bash
npm run dev
# Form submissions will show a preview URL in the success message
```

### Option B: Real Gmail Account

1. Create `.env.local`:
   ```env
   Mail=your-email@gmail.com
   Mail_App_Password=your-16-char-app-password
   ```

2. Run dev server:
   ```bash
   npm run dev
   ```

3. Test:
   ```bash
   npm run test-contact
   ```

---

## Files Modified

| File | Change |
|------|--------|
| `api/contact.ts` | Added logging, error handling, env var checks |
| `src/components/ContactSection.tsx` | Safe JSON parsing, preview URL support, better errors |
| `src/pages/ContactPage.tsx` | Safe JSON parsing, preview URL support, better errors |
| `vercel.json` | Ensured `/api/*` routes are preserved |
| `.env.example` | New: Example env vars with documentation |
| `VERCEL_SETUP.md` | New: Complete Vercel setup guide |
| `README.md` | Updated with contact API section |
| `scripts/test-contact.js` | New: Test script for local API testing |
| `package.json` | Added `test-contact` npm script |

---

## Verification Checklist

- [ ] Set `Mail` and `Mail_App_Password` on Vercel (Settings → Environment Variables)
- [ ] Redeploy to Vercel
- [ ] Test contact form at https://www.emcobe.net/contact
- [ ] Submit a test message
- [ ] Verify email received (check spam folder too)
- [ ] If stuck, check Vercel function logs for error details

---

## What's Next?

If you still see errors:

1. **Check Vercel Logs:**
   - Dashboard → Deployments → Latest → Logs
   - Look for `console.error()` or `console.log()` output

2. **Common Issues:**
   - ❌ `Mail` set but `Mail_App_Password` not set → Set both
   - ❌ App password has spaces → Remove spaces
   - ❌ Using regular Gmail password → Use 16-char app password instead
   - ❌ 2-Step Verification not enabled → Enable it on Gmail account

3. **Local Testing First:**
   - Run `npm run dev` and test with Ethereal account first
   - If that works, the issue is env vars on Vercel, not the code

---

**All fixes are ready to deploy!** 🚀
