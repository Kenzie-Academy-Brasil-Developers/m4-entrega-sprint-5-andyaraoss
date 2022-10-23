import { Request, Response } from "express";
import categoryListAllService from "../services/categories/categoryListAll.service";

const categoryListAllController = async (req: Request, res: Response) => {
  const category = await categoryListAllService();
  return res.json(category);
};

export default categoryListAllController;
