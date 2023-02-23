import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';
import ProductState from '../models/productStateModel.js';
import User from '../models/userModel.js';
import Transaction from '../models/transactionModel.js';

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  const productsWidthState = await Promise.all(
    products.map(async product => {
      const productState = await ProductState.find({ productId: product._id });

      return { ...product._doc, productState };
    })
  );

  res.status(200).json(productsWidthState);
});

export const getCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find({ role: 'user' }).select('-password');

  res.status(200).json(customers);
});

// *getTransactions functionality with sort, search && pagination
export const getTransactions = asyncHandler(async (req, res) => {
  // !sort should lok like {"field": "userId", "sort": "desc"}
  const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;

  // !formatted sort should lok like {userId: -1}
  const generateSort = () => {
    const sortParsed = JSON.parse(sort);

    const sortFormatted = {
      [sortParsed.field]: (sortParsed.sort = 'asc' ? 1 : -1),
    };

    return sortFormatted;
  };

  const sortFormatted = Boolean(sort) ? generateSort() : {};

  const transactions = await Transaction.find({
    $or: [
      { cost: { $regex: new RegExp(search, 'i') } },
      { userId: { $regex: new RegExp(search, 'i') } },
    ],
  })
    .sort(sortFormatted)
    .skip(page * pageSize)
    .limit(pageSize);

  // *get the totalTransactions number
  const totalTransactionsNum = await Transaction.countDocuments({
    name: { $regex: search, $options: 'i' },
  });

  res.status(200).json({ transactions, totalTransactionsNum });
});

// export const getProductsWithState = asyncHandler(async (req, res) => {
//   try {
//     const productsWithState = await ProductState.find().populate('product');
//     res.status(200).json(productsWithState);
//   } catch (error) {
//     res.status(error.statusCode).json(error.message);
//   }
// });
