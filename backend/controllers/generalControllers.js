import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import Transaction from '../models/transactionModel.js';
import OverAllStat from '../models/overallStatModel.js';

// *@desc Get logged in user
// *@route GET /api/general/user/:id
// *@access public (for now)
export const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    res.status(200).send(user);
  } catch (error) {
    res.status(404);
    throw new Error('User not found!');
  }
});

// *@desc Get Dashboard page stats
// *@route GET /api/general/dashboard
// *@access public
export const getDashboardStats = asyncHandler(async (req, res) => {
  // Hardcoded values
  const currMonth = 'November';
  const currYear = '2021';
  const currDay = '2021-11-15';

  // *Get Recent Transactions
  const transactions = await Transaction.find()
    .limit(50)
    .sort({ createdOn: -1 });

  // *Get Overall stats
  const overallStat = await OverAllStat.find({ year: currYear });

  const {
    totalCustomers,
    yearlyTotalSoldUnits,
    yearlySalesTotal,
    monthlyData,
    salesByCategory,
  } = overallStat[0];

  // *Get currMonth stats
  const thisMonthStats = overallStat[0].monthlyData.find(
    ({ month }) => month === currMonth
  );

  // *Get currDay stats
  const todayStats = overallStat[0].dailyData.find(
    ({ date }) => date === currDay
  );

  res.status(200).json({
    totalCustomers,
    yearlyTotalSoldUnits,
    yearlySalesTotal,
    monthlyData,
    salesByCategory,
    thisMonthStats,
    todayStats,
    transactions,
  });
});
