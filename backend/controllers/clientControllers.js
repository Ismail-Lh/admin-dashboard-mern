import asyncHandler from 'express-async-handler';
import getCountryISO3 from 'country-iso-2-to-3';

import Product from '../models/productModel.js';
import ProductState from '../models/productStateModel.js';
import User from '../models/userModel.js';
import Transaction from '../models/transactionModel.js';

// *@desc Get all products
// *@route GET /api/client/products
// *@access public (for now)
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

// *@desc Get all customers
// *@route GET /api/client/customers
// *@access public (for now)
export const getCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find({ role: 'user' }).select('-password');

  res.status(200).json(customers);
});

// *@desc getTransactions functionality with sort, search && pagination
// *@route GET /api/client/transactions
// *@access public (for now)
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

// *@desc Get the total of users in one geography place (country) EX: {id: "USA", count: 100}
// *@route GET /api/client/geography
// *@access public (for now)
export const getGeography = asyncHandler(async (req, res) => {
  const users = await User.find();

  // * return an array of the name of the country and the total users in the same country
  const mappedLocations = users.reduce((acc, { country }) => {
    // !convert the country name convention from EX: US to USA
    const countryISO3 = getCountryISO3(country);

    if (!acc[countryISO3]) {
      acc[countryISO3] = 0;
    }

    acc[countryISO3]++;

    return acc;
  }, {});

  // *return a formatted object of the name of the country and the total users
  const formattedLocations = Object.entries(mappedLocations).map(
    ([country, count]) => {
      return { id: country, value: count };
    }
  );

  res.status(200).json(formattedLocations);
});

// export const getProductsWithState = asyncHandler(async (req, res) => {
//   try {
//     const productsWithState = await ProductState.find().populate('product');
//     res.status(200).json(productsWithState);
//   } catch (error) {
//     res.status(error.statusCode).json(error.message);
//   }
// });
