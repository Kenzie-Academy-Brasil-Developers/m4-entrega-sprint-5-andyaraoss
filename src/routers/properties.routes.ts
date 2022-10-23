import { Router } from "express";
import propertyCreateController from "../controllers/propertyCreate.controller";
import propertyListAllController from "../controllers/propertyListAll.controller";
import authUser from "../middlewares/authUser.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const propertiesRoutes = Router();

propertiesRoutes.get("", propertyListAllController);
propertiesRoutes.post("", authUser, isAdmMiddleware, propertyCreateController);

export default propertiesRoutes;
