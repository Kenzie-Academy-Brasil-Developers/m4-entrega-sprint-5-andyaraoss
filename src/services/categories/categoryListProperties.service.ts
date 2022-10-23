import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";

const categoryListPropertiesService = async (
  id: string
): Promise<Categories> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const propertiesByCategory = await categoriesRepository.findOneBy({
    id: id,
  });

  if (!propertiesByCategory) {
    throw new AppError("Could not find this category", 404);
  }

  return propertiesByCategory;
};

export default categoryListPropertiesService;
