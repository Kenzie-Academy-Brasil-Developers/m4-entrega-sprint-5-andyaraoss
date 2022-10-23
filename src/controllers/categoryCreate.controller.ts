import { Request, Response } from "express";

import categoryCreateService from "../services/categories/categoryCreate.service";
import { ICategoryRequest } from "../interfaces/categories";

const categoryCreateController = async (req: Request, res: Response) => {
  const category: ICategoryRequest = req.body;
  const createdCategory = await categoryCreateService(category);
  return res.status(201).json(createdCategory);
};

export default categoryCreateController;
