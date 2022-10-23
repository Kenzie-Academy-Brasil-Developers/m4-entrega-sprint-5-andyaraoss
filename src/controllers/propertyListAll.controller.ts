import { Request, Response } from "express";
import propertyListAllService from "../services/properties/propertyListAll.service";

const propertyListAllController = async (req: Request, res: Response) => {
  const properties = await propertyListAllService();
  return res.json(properties);
};

export default propertyListAllController;
