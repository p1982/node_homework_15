import UsersRepository from "../../dal/users/users.repository.ts";
import { IUser } from "../../types/users.interface.ts";
import { Service } from "typedi";

@Service()
class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUserByEmail = (email: string): Promise<IUser> => {
    return this.usersRepository.getByEmail(email);
  };

  createAUser = (user: IUser) => {
    console.log(1111111);
    return this.usersRepository.createAUser(user);
  };
}

export default UsersService;