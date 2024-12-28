import express from 'express';
import corsConfig from './config/corsConfig.js';
import authRoutes from './routes/auth.js';
import fileRoutes from './routes/files.js';

import AppDataSource from './utils/db.js';

const app = express();

app.use(express.json());
app.use(corsConfig);

app.use('/api', authRoutes);
app.use('/api', fileRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
        app.listen(3000, () => console.log('Server running on http://localhost:3000'));
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });