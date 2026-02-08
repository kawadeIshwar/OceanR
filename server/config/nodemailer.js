import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'OceanR - Password Reset OTP',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 32px;">OceanR Enterprises</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Password Reset Request</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px;">
            <h2 style="color: #333; margin-bottom: 20px;">Your OTP Code</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              You have requested to reset your password. Use the OTP code below to proceed:
            </p>
            
            <div style="background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 30px 0; border-radius: 8px;">
              <span style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px;">${otp}</span>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              <strong>Important:</strong>
            </p>
            <ul style="color: #666; font-size: 14px; line-height: 1.6;">
              <li>This OTP will expire in <strong>10 minutes</strong></li>
              <li>Never share this code with anyone</li>
              <li>If you didn't request this, please ignore this email</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 10px;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              This is an automated message from OceanR Enterprises. Please do not reply to this email.
            </p>
            <p style="color: #666; font-size: 12px; margin: 10px 0 0 0;">
              © 2024 OceanR Enterprises. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};

export default { sendOTPEmail };
