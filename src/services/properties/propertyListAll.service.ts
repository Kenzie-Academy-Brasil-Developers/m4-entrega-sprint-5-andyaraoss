import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";

const propertyListAllService = async (): Promise<Properties[]> => {
  const propertyRepository = AppDataSource.getRepository(Properties);

  const properties = await propertyRepository.find();

  return properties;
};

export default propertyListAllService;
