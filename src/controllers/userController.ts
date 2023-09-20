import { Request, Response } from "express";
import User from "../models/User";
import { BadRequestError } from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";

const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const user = await User.findById(userId, "name email");

  if (!user) {
    throw new BadRequestError("User not available");
  }

  res.status(200).json(user);
});

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({}, "name email");

  res.status(200).json(
    users.map((user) => {
      return { id: user._id, name: user.name, email: user.email };
    })
  );
});

export { getUser, getUsers };
