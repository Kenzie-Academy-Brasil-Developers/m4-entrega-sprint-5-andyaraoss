import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import userUptadeService from "../services/users/userUpdate.service";
import { instanceToPlain } from "class-transformer";

const userUpdateController = async (req: Request, res: Response) => {
  const user: User = req.body;
  const id: string = req.params.id;
  const userId: string = req.user.id;
  const isAdm: boolean = req.user.isAdm;

  const updatedUser = await userUptadeService(user, id, isAdm, userId);

  if (updatedUser instanceof User) {
    return res.json(instanceToPlain(updatedUser));
  }

  return res.status(updatedUser[1] as number).json({
    message: updatedUser[0],
  });
};
export default userUpdateController;
