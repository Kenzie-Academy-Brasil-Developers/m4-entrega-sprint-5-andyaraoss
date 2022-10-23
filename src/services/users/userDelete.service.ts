import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";

const userDeleteService = async (
  id: string
): Promise<User | Array<string | number>> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    return ["User not found", 404];
  }

  if (!findUser.isActive) {
    return ["User inactive", 400];
  }

  await userRepository.update(id, {
    isActive: false,
  });

  return ["User is now disabled", 204];
};

export default userDeleteService;
