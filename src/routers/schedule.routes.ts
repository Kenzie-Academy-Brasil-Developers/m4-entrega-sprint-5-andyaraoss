import { Router } from "express";
import authUser from "../middlewares/authUser.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";
import schedulesListPropertiesController from "../controllers/schedulesListProperties.controller";
import schedulesUsersPropertiescontroller from "../controllers/schedulesUsersProperties.controller";

const scheduleRoutes = Router();

scheduleRoutes.post("", authUser, schedulesUsersPropertiescontroller);
scheduleRoutes.get(
  "/properties/:id",
  authUser,
  isAdmMiddleware,
  schedulesListPropertiesController
);

export default scheduleRoutes;
