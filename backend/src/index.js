import { app } from './app.js';
import { connectToDB } from './config/db.config.js';
import { PORT } from './config/env.config.js';
import { createAdmin } from './seeders/admin.seeder.js';

const startServer = async () => {
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
