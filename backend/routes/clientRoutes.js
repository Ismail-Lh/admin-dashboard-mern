import express from 'express';

import { getProducts, getCustomers } from '../controllers/clientControllers.js';

const router = express.Router();

router.route('/products').get(getProducts);
router.route('/customers').get(getCustomers);
// router.route('/products/states').get(getProductsWithState);

export default router;
