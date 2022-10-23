import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import userDeleteService from "../services/users/userDelete.service";

const userDeleteController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const deletedUser = await userDeleteService(id);

  if (deletedUser instanceof User) {
    return res.json(deletedUser);
  }
  return res.status(deletedUser[1] as number).json({
    message: deletedUser[0],
  });
};

export default userDeleteController;
