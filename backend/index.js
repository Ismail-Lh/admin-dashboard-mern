import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import colors from 'colors';

import connectDB from './connectDB.js';

import clientRoutes from './routes/clientRoutes.js';
import generalRoutes from './routes/generalRoutes.js';
import managementRoutes from './routes/managementRoutes.js';
import salesRoutes from './routes/salesRoutes.js';
import { errorHandler, notFoundRoute } from './middleware/errorMiddleware.js';

// CONFIGURATION
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ROUTES
app.use('/api/client', clientRoutes);
app.use('/api/general', generalRoutes);
app.use('/api/management', managementRoutes);
app.use('/api/sales', salesRoutes);

// GLOBAL MIDDLEWARE
app.use(notFoundRoute);
app.use(errorHandler);

// SERVER
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV;

app.listen(
  PORT,
  console.log(
    `Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.underline.bold
  )
);
