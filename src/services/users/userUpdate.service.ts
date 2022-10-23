import { User } from "../../entities/user.entity";
import { hash } from "bcrypt";
import AppDataSource from "../../data-source";

const userUptadeService = async (
  user: User,
  id: string,
  isAdm: boolean,
  userId: string
): Promise<User | Array<string | number>> => {
  if (
    user.isAdm !== undefined ||
    user.isActive !== undefined ||
    user.id !== undefined
  ) {
    return ["It's not possible to change this information", 401];
  }

  const { name, email, password } = user;
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    return ["User not found", 404];
  }

  if (!isAdm && userId !== id) {
    return ["Unauthorized user", 401];
  }

  await userRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    password: password ? await hash(password, 10) : findUser.password,
  });

  const userUpdated = await userRepository.findOneBy({
    id,
  });

  return userUpdated!;
};

export default userUptadeService;
