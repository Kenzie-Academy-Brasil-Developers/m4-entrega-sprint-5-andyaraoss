import { Router } from "express";
import categoryCreateController from "../controllers/categoryCreate.controller";
import categoryListAllController from "../controllers/categoryListAll.controller";
import categoryListPropertiesController from "../controllers/categoryListProperties.controller";
import authUser from "../middlewares/authUser.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const categoriesRoutes = Router();

categoriesRoutes.post("", authUser, isAdmMiddleware, categoryCreateController);
categoriesRoutes.get("", categoryListAllController);
categoriesRoutes.get("/:id/properties", categoryListPropertiesController);

export default categoriesRoutes;
