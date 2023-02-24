import express from 'express';

import { getOverallSalesStat } from '../controllers/salesControllers';

const router = express.Router();

router.route('/').get(getOverallSalesStat);

export default router;
