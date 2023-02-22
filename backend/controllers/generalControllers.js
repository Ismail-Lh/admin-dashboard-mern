import asyncHandler from 'express-async-handler';

import User from '../models/userModel';

export const getUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    res.status(200).send(user);
  } catch (error) {
    res.status(404);
    throw new Error('User not found!');
  }
});
