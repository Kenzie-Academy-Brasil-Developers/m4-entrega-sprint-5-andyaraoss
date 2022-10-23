import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";

const propertyCreateService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest): Promise<Properties> => {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const addressesRepository = AppDataSource.getRepository(Addresses);
  const categoryRepository = AppDataSource.getRepository(Categories);

  const { district, zipCode, number, city, state } = address;

  if (state.length > 2) {
    throw new AppError("The state must have only 2 letters");
  }

  if (zipCode.length > 8) {
    throw new AppError("The zipCode must have only 8 numbers");
  }

  const findCategoryId = (await categoryRepository.find()).find((category) => {
    return category.id === categoryId;
  });

  if (!findCategoryId) {
    throw new AppError("Invalid category", 404);
  }

  const findAddress = await addressesRepository.findOne({
    where: {
      district: district,
      zipCode: zipCode,
      number: number,
      city: city,
      state: state,
    },
  });

  if (findAddress) {
    throw new AppError("Unable to register a property with this address");
  }

  const newAddress = addressesRepository.create({
    district,
    zipCode,
    number,
    city,
    state,
  });
  await addressesRepository.save(newAddress);

  const property = propertiesRepository.create({
    value,
    size,
    address: newAddress,
    category: findCategoryId,
  });

  await propertiesRepository.save(property);

  return property;
};

export default propertyCreateService;
