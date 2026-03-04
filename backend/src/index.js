import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from './config/passport.js';
import AuthRouter from './routes/auth.route.js';
import AnalyzeRouter from './routes/analyze.route.js';
import ProfileRouter from './routes/profile.route.js';
import UserRouter from './routes/user.route.js';
import ScoreRouter from './routes/score.route.js';
import { connectToDB } from './config/db.js';
import { PORT, SESSION_SECRET, CORS_ORIGIN } from './config/config.js';
import cookieParser from "cookie-parser";
import { createAdmin } from './seeders/adminSeed.js';
import { deleteUploads } from './utils/fileCleanup.js';


const app = express();

app.set('trust proxy', 1);

// Middleware
app.use(bodyParser.json());
app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ extended: true, limit: '16mb' }));
app.use(express.static('public'));
app.use(cookieParser(SESSION_SECRET));

// CORS configuration (with credentials for frontend)
app.use(
    cors({
        origin: CORS_ORIGIN,
        credentials: true,
    })
);

// Passport middleware
app.use(passport.initialize());

// Routes
app.use('/auth', AuthRouter);
app.use('/analyze', AnalyzeRouter);
app.use('/profile', ProfileRouter);
app.use('/user', UserRouter);
app.use('/score', ScoreRouter);


// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ message });
});

const startServer = async () => {
    await deleteUploads();
    await createAdmin();
    app.listen(PORT, () => {
        console.log(`✅ Server running on PORT ${PORT}`);
    });
};

connectToDB()
    .then(async () => {
        await startServer();
    })
    .catch((error) => {
        console.error('❌ MongoDB Database failed to connect:', error);
    });
