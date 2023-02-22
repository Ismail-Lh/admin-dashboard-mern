import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './connectDB.js';

import User from './models/userModel.js';
import { dataUser, dataProduct, dataProductStat } from './data/index.js';
import ProductState from './models/productStateModel.js';
import Product from './models/productModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await ProductState.deleteMany();

    await User.insertMany(dataUser);
    await Product.insertMany(dataProduct);
    await ProductState.insertMany(dataProductStat);

    console.log('Data imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await ProductState.deleteMany();

    console.log('Data deleted!'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}