import { sendContactEmail } from '../utils/sendgrid.util.js';
import asyncHandler from '../utils/async-handler.util.js';

const handleContactInquiry = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;
    const success = await sendContactEmail(name, email, subject, message);
    if (success) return res.status(200).json({ message: "Message sent successfully" });
    return res.status(500).json({ message: "Failed to send message. Please try again later." });
});

export { handleContactInquiry };
