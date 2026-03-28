import mailjet from "node-mailjet";
import { MAILJET_API_KEY, MAILJET_API_SECRET, EMAIL_FROM, NAME_FROM } from "../config/env.config";

const mailjet = mailjet.connect(MAILJET_API_KEY, MAILJET_API_SECRET);

export const sendContactEmail = async (name, email, subject, message) => {
    try {
        const request = mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": `contact@${EMAIL_FROM}`,
                            "Name": NAME_FROM,
                        },
                        "To": [
                            {
                                "Email": EMAIL_FROM,
                                "Name": NAME_FROM,
                            }
                        ],
                        "Subject": `[Contact Form] ${subject} - from ${name}`,
                        "HTMLPart": `
                            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
                                <div style="background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%); padding: 30px; border-radius: 20px 20px 0 0; text-align: center;">
                                    <h2 style="color: white; margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 20px;">New Contact Inquiry</h2>
                                </div>
                                
                                <div style="padding: 40px; background: white; border: 1px solid #f1f5f9; border-top: none; border-radius: 0 0 20px 20px;">
                                    <div style="margin-bottom: 25px;">
                                        <span style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">From</span>
                                        <p style="margin: 5px 0 0 0; color: #1e293b; font-weight: 700; font-size: 16px;">${name} &lt;${email}&gt;</p>
                                    </div>

                                    <div style="margin-bottom: 25px;">
                                        <span style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Subject</span>
                                        <p style="margin: 5px 0 0 0; color: #1e293b; font-weight: 700; font-size: 16px;">${subject}</p>
                                    </div>

                                    <div style="margin-bottom: 30px; padding: 20px; background: #f8fafc; border-radius: 15px; border-left: 4px solid #3b82f6;">
                                        <span style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Message</span>
                                        <p style="margin: 10px 0 0 0; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                                    </div>

                                    <div style="text-align: center; margin-top: 40px;">
                                        <a href="mailto:${email}" style="display: inline-block; padding: 14px 30px; background: #1e293b; color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Reply to ${name}</a>
                                    </div>
                                </div>
                                
                                <p style="text-align: center; color: #94a3b8; font-size: 11px; margin-top: 30px;">
                                    &copy; 2026 CodeFolio Insights &bull; Automated System
                                </p>
                            </div>
                        `,
                    }
                ]
            })
        await request;
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
}

export const sendOtpEmail = async (email, otp) => {
    try {
        const request = mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": EMAIL_FROM,
                            "Name": NAME_FROM,
                        },
                        "To": [
                            {
                                "Email": email,
                                "Name": "User",
                            }
                        ],
                        "Subject": 'Your Verification Code - CodeFolio Insights',
                        "HTMLPart": `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; rounded: 10px;">
                                <h2 style="color: #4f46e5; text-align: center;">CodeFolio Insights</h2>
                                <p>Hello,</p>
                                <p>Use the following code to complete your verification. This code is valid for 10 minutes.</p>
                                <div style="text-align: center; margin: 30px 0;">
                                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1f2937; background: #f3f4f6; padding: 10px 20px; border-radius: 8px;">
                                        ${otp}
                                    </span>
                                </div>
                                <p>If you didn't request this, please ignore this email.</p>
                                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                                <p style="font-size: 12px; color: #6b7280; text-align: center;">
                                    &copy; 2026 CodeFolio Insights. All rights reserved.
                                </p>
                            </div>
                        `,
                    }
                ]
            })
        await request;
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
}