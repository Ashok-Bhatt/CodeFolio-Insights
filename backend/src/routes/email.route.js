import express from 'express';
import { handleContactInquiry } from '../controllers/email.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { contactFormValidationSchema } from '../validators/email.validate.js';

const router = express.Router();

router.post(
    '/contact-us',
    validate(contactFormValidationSchema),
    handleContactInquiry
);

export default router;
