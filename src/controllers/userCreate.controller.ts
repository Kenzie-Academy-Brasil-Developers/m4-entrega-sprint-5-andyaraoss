import { Request, Response } from "express";
import userCreateService from "../services/users/userCreate.service";
import { IUserRequest } from "../interfaces/users";
import { instanceToPlain } from "class-transformer";

const userCreateController = async (req: Request, res: Response) => {
  try {
    const user: IUserRequest = req.body;
    const createdUser = await userCreateService(user);
    return res.status(201).json(instanceToPlain(createdUser));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

export default userCreateController;
