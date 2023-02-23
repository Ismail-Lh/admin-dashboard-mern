import express from 'express';

import { getProducts } from '../controllers/clientControllers.js';

const router = express.Router();

router.route('/products').get(getProducts);
// router.route('/products/states').get(getProductsWithState);

export default router;
