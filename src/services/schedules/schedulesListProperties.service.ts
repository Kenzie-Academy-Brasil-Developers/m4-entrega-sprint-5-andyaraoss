import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { SchedulesUsersProperties } from "../../entities/schedulesUsersProperties.entity";
import { AppError } from "../../errors/appError";

const schedulesListPropertiesService = async (
  id: string
): Promise<SchedulesUsersProperties[]> => {
  const schedulesRepository = AppDataSource.getRepository(
    SchedulesUsersProperties
  );

  const propertiesRepository = AppDataSource.getRepository(Properties);

  const findProperty = await propertiesRepository.findOneBy({
    id: id,
  });

  if (!findProperty) {
    throw new AppError("Could not find this property", 404);
  }

  const schedulesByProperty = (await schedulesRepository.find()).filter(
    (schedule) => {
      return schedule.property.id === id;
    }
  );

  return schedulesByProperty;
};

export default schedulesListPropertiesService;
