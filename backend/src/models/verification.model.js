import mongoose from 'mongoose';

const VerificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    type: {
        type: String,
        enum: ['signup', 'login'],
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }, // TTL index
    },
}, { timestamps: true });

const VerificationModel = mongoose.model('verifications', VerificationSchema);

export default VerificationModel;
