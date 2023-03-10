import asyncHandler from 'express-async-handler';

import OverAllStat from '../models/overallStatModel.js';

// TODO: MAKE THIS ROUTE PRIVATE
// *@desc Get overall products sales stat
// *@route GET /api/sales
// *@access public (for now)
export const getOverallSales = asyncHandler(async (req, res) => {
  const overAllSales = await OverAllStat.find();

  res.status(200).json(overAllSales[0]);
});
