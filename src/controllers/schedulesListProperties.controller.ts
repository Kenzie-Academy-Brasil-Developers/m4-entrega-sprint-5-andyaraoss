import { Request, Response } from "express";
import schedulesListPropertiesService from "../services/schedules/schedulesListProperties.service";

const schedulesListPropertiesController = async (
  req: Request,
  res: Response
) => {
  const id: string = req.params.id;
  const schedulesByProperty = await schedulesListPropertiesService(id);
  return res.json({ schedules: schedulesByProperty });
};

export default schedulesListPropertiesController;
