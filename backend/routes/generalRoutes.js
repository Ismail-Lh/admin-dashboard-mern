import express from 'express';

import { getUserById } from '../controllers/generalControllers';

const router = express.Router();

router.route('/users/:id').get(getUserById);

export default router;
