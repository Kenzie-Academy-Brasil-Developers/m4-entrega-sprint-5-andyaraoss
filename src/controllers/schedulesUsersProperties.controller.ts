import { Request, Response } from "express";

import schedulesUsersPropertiesService from "../services/schedules/schedulesUsersProperties.service";

const schedulesUsersPropertiescontroller = async (
  req: Request,
  res: Response
) => {
  const date = req.body.date;
  const hour = req.body.hour;
  const propertyId = req.body.propertyId;
  const userId = req.user.id;

  const createdSchedule = await schedulesUsersPropertiesService({
    date,
    hour,
    propertyId,
    userId,
  });
  return res.status(201).json(createdSchedule);
};

export default schedulesUsersPropertiescontroller;
