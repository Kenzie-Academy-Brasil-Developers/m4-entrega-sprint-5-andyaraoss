import { Request, Response } from "express";
import { IPropertyRequest } from "../interfaces/properties";
import propertyCreateService from "../services/properties/propertyCreate.service";

const propertyCreateController = async (req: Request, res: Response) => {
  const property: IPropertyRequest = req.body;
  const { value, size, address, categoryId } = property;
  const createdProperty = await propertyCreateService({
    value,
    size,
    address,
    categoryId,
  });
  return res.status(201).json(createdProperty);
};

export default propertyCreateController;
