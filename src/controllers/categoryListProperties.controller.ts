import { Request, Response } from "express";
import categoryListPropertiesService from "../services/categories/categoryListProperties.service";

const categoryListPropertiesController = async (
  req: Request,
  res: Response
) => {
  const id: string = req.params.id;
  const propertiesByCategory = await categoryListPropertiesService(id);
  return res.json(propertiesByCategory);
};

export default categoryListPropertiesController;
