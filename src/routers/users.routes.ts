import { Router } from "express";
import userCreateController from "../controllers/userCreate.controller";
import userDeleteController from "../controllers/userDelete.controller";
import userListAllController from "../controllers/userListAll.controller";
import userUpdateController from "../controllers/userUpdate.controller";
import authUser from "../middlewares/authUser.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const usersRoutes = Router();

usersRoutes.post("", userCreateController);
usersRoutes.get("", authUser, isAdmMiddleware, userListAllController);
usersRoutes.patch("/:id", authUser, userUpdateController);
usersRoutes.delete("/:id", authUser, isAdmMiddleware, userDeleteController);

export default usersRoutes;
