import express from 'express';

import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} from '../controllers/clientControllers.js';

const router = express.Router();

router.route('/products').get(getProducts);
router.route('/customers').get(getCustomers);
router.route('/transactions').get(getTransactions);
router.route('/geography').get(getGeography);
// router.route('/products/states').get(getProductsWithState);

export default router;
