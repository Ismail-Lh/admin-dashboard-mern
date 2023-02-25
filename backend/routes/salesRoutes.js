import express from 'express';

import { getOverallSales } from '../controllers/salesControllers.js';

const router = express.Router();

router.route('/').get(getOverallSales);

export default router;
