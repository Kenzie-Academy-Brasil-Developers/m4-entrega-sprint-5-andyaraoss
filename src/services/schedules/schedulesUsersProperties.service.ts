import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { SchedulesUsersProperties } from "../../entities/schedulesUsersProperties.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const schedulesUsersPropertiesService = async ({
  date,
  hour,
  propertyId,
  userId,
}: IScheduleRequest): Promise<Object> => {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const usersRepository = AppDataSource.getRepository(User);
  const schedulesRepository = AppDataSource.getRepository(
    SchedulesUsersProperties
  );

  const findUserId = await usersRepository.findOneBy({
    id: userId,
  });

  if (!findUserId) {
    throw new AppError("User not found");
  }

  const findPropertyId = await propertiesRepository.findOneBy({
    id: propertyId,
  });

  if (!findPropertyId) {
    throw new AppError("Property not found", 404);
  }

  const findSchedules = await schedulesRepository.findOne({
    where: {
      hour: hour,
      date: date,
    },
  });

  if (findSchedules) {
    throw new AppError("Unable to schedule a visit at this date and time");
  }

  const dayWeek = new Date(date).toString().split(" ")[0];

  const dayHour = hour.split(":")[0] + hour.split(":")[1];

  if (dayWeek === "Sat" || dayWeek === "Sun") {
    throw new AppError("It is not possible to schedule a visit on weekends");
  }

  if (Number(dayHour) < 800 || Number(dayHour) > 1800) {
    throw new AppError("Invalid hour");
  }

  const newSchedule = schedulesRepository.create({
    date,
    hour,
    property: findPropertyId,
    user: findUserId,
  });

  await schedulesRepository.save(newSchedule);

  return { message: "Schedule created" };
};

export default schedulesUsersPropertiesService;
