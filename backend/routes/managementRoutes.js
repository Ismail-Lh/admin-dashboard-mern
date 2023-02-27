import express from 'express';

import { getAdmins } from '../controllers/managementControllers';

const router = express.Router();

router.route('/admins').get(getAdmins);

export default router;
