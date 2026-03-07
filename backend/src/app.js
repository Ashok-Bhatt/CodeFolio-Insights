import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from './config/passport.config.js';
import AuthRouter from './routes/auth.route.js';
import AnalyzeRouter from './routes/analyze.route.js';
import ProfileRouter from './routes/profile.route.js';
import UserRouter from './routes/user.route.js';
import ScoreRouter from './routes/score.route.js';
import PlatformRouter from './routes/platform.route.js';
import AnalyticsRouter from './routes/analytics.route.js';
import ProjectRouter from './routes/project.route.js';
import { SESSION_SECRET, CORS_ORIGIN } from './config/env.config.js';
import cookieParser from "cookie-parser";
import { publicApiRateLimiter } from './middlewares/rate-limiter.middleware.js';
import { getAnalytics } from './middlewares/analytics.middleware.js';
import { verifyApiKey } from './middlewares/api-key.middleware.js';

const app = express();

app.set('trust proxy', 1);

// Middleware
app.use(bodyParser.json());
app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ extended: true, limit: '16mb' }));
app.use(express.static('public'));
app.use(cookieParser(SESSION_SECRET));

// CORS configuration (with credentials for frontend) for private routes
const privateRoutesConfiguration = {
    origin: CORS_ORIGIN,
    credentials: true,
}

const publicRoutesConfiguration = {
    origin: "*",
}

app.use(
    cors(privateRoutesConfiguration)
);

// Passport middleware
app.use(passport.initialize());

// Routes
app.use('/auth', AuthRouter);
app.use('/analyze', AnalyzeRouter);
app.use('/profile', ProfileRouter);
app.use('/user', UserRouter);
app.use('/score', ScoreRouter);
app.use('/analytics', AnalyticsRouter);
app.use('/project', ProjectRouter);
app.use('/platform', cors(publicRoutesConfiguration), verifyApiKey, publicApiRateLimiter, getAnalytics, PlatformRouter);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ message });
});

export { app };
