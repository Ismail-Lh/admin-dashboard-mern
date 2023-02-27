import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import AffiliateStat from '../models/affiliateStatModel.js';
import Transaction from '../models/transactionModel.js';

// *@desc Get all admins
// *@route GET /api/management/admins
// *@access public (for now)
export const getAdmins = asyncHandler(async (req, res) => {
  const admins = await User.find({ role: 'admin' }).select('-password');

  res.status(200).json(admins);
});

// *@desc Get user sales performance
// *@route GET /api/management/performance/:id
// *@access public (for now)
export const getUserPerformance = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const userWithStats = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'affiliatestats',
        localField: '_id',
        foreignField: 'userId',
        as: 'affiliateStats',
      },
    },
    { $unwind: '$affiliateStats' },
  ]);

  const saleTransactions = await Promise.all(
    userWithStats[0].affiliateStats.affiliateSales.map(id => {
      return Transaction.findById(id);
    })
  );
  const filteredSaleTransactions = saleTransactions.filter(
    transaction => transaction !== null
  );

  res
    .status(200)
    .json({ user: userWithStats[0], sales: filteredSaleTransactions });
});
