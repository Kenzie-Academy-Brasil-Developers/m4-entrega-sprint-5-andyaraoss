import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import userListAllService from "../services/users/userListAll.service";

const userListAllController = async (req: Request, res: Response) => {
  try {
    const users = await userListAllService();
    return res.send(instanceToPlain(users));
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default userListAllController;
