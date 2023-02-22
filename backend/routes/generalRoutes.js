import express from 'express';

import { getUser } from '../controllers/generalControllers.js';

const router = express.Router();

router.route('/users/:id').get(getUser);

export default router;
