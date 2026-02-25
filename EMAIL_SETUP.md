# Email Contact Form Setup Guide

Your contact form is now configured to send real emails! Here's how to set it up:

## Option 1: EmailJS (Recommended - Free & Easy)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. Go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose Gmail (or your preferred email provider)
4. Connect your email account (dhimanaditya56@gmail.com)
5. Copy the **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Portfolio Contact from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Copy the **Template ID**

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Configure Environment Variables
1. Open your `.env` file (or create one if it doesn't exist)
2. Add these variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the values with your actual IDs from EmailJS
4. Restart your development server

### Step 6: Test
1. Fill out the contact form on your website
2. Submit the form
3. Check your email (dhimanaditya56@gmail.com) for the message

## Option 2: Fallback (No Setup Required)

If you don't configure EmailJS, the form will automatically fall back to opening the user's default email client with a pre-filled message. This works without any setup but requires the user to have an email client installed.

## Features

✅ Real email delivery to dhimanaditya56@gmail.com
✅ Toast notifications for success/error
✅ Loading state while sending
✅ Automatic fallback to mailto: if EmailJS fails
✅ Form validation
✅ Responsive design

## Troubleshooting

**Emails not arriving?**
- Check your EmailJS dashboard for delivery status
- Verify your email service is connected properly
- Check spam folder
- Ensure environment variables are set correctly

**Form shows "Opening email client"?**
- This means EmailJS is not configured
- Follow the setup steps above to enable direct email sending

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 2 email services
- 2 email templates

This should be more than enough for a portfolio contact form!
