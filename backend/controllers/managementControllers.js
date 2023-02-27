import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';

// *@desc Get all admins
// *@route GET /api/management/admins
// *@access public (for now)
export const getAdmins = asyncHandler(async (req, res) => {
  const admins = await User.find({ role: 'admin' }).select('-password');

  res.status(200).json(admins);
});
