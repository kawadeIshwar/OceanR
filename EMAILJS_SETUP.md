# EmailJS Setup Guide

This guide will help you set up EmailJS for the OceanR contact form.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. After logging in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account and authorize EmailJS
5. Note down your **Service ID** (it will look like `service_xxxxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Fill in the template details:

### Template Content:
```
Subject: New Contact Form Submission from {{from_name}}

Dear OceanR Team,

You have received a new contact form submission with the following details:

PERSONAL INFORMATION:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}

BUSINESS INFORMATION:
- Company: {{company}}
- Industry: {{industry}}
- Inquiry Type: {{inquiry_type}}

PROJECT DETAILS:
- Budget: {{budget}}
- Message: {{message}}

Please respond to this inquiry as soon as possible.

Best regards,
OceanR Website
```

4. Set the **To Email** to your business email (e.g., `oceanrenterprises@gmail.com`)
5. Note down your **Template ID** (it will look like `template_xxxxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **API Keys**
2. Copy your **Public Key** (it will look like `xxxxxxxxxxxxxxxxxxxxxxxxxx`)

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update the `.env` file with your EmailJS credentials:
```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_your_service_id
VITE_EMAILJS_TEMPLATE_ID=template_your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 6: Test the Contact Form

1. Restart your development server:
```bash
npm run dev
```

2. Go to the contact page and fill out the form
3. Submit the form and check if you receive the email

## Important Notes

- **Free Plan Limitations**: EmailJS free plan allows 200 emails per month
- **Security**: Never expose your private key in the frontend code
- **Template Variables**: Make sure the variable names in your template match exactly with the `templateParams` in the code
- **Email Deliverability**: Check your spam folder if you don't receive test emails

## Troubleshooting

### Common Issues:

1. **"EmailJS is not defined"**
   - Make sure you installed the package: `npm install @emailjs/browser`

2. **"Invalid public key"**
   - Double-check your public key in the `.env` file
   - Ensure you're using the Public Key, not the Private Key

3. **"Template not found"**
   - Verify your template ID is correct
   - Make sure the template is active in EmailJS dashboard

4. **"Service not found"**
   - Check your service ID
   - Ensure the email service is properly connected

5. **No email received**
   - Check your spam folder
   - Verify the "To Email" in your template
   - Ensure your email service is connected properly

### Debug Mode:

You can enable debug mode by adding this to your EmailJS initialization:
```javascript
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY, { debug: true });
```

## Production Deployment

When deploying to production:
1. Make sure your environment variables are properly set in your hosting platform
2. Test the contact form on the live site
3. Monitor your EmailJS usage to stay within limits

## Support

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)
