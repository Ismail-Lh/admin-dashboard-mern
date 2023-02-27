import express from 'express';

import {
  getAdmins,
  getUserPerformance,
} from '../controllers/managementControllers.js';

const router = express.Router();

router.route('/admins').get(getAdmins);
router.route('/performance/:id').get(getUserPerformance);

export default router;
