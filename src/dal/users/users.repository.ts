import { IUser } from "../../types/users.interface.ts";
import { Service } from "typedi";
import { ITable } from '../../types/params.interface.ts';
import { AppDataSource } from "../dataSource.ts";
import { UserEntity } from "../entity/user.ts";
@Service()
class UsersRepository {
  repo;
  constructor() {
    this.repo = AppDataSource.getRepository(UserEntity);
  }

  getByEmail = async (email: string): Promise<any> => {
    const res = await this.repo.findOne({ where: { email } });  
    return res
  };

  createAUser = async (user: any): Promise<any> => {
    
    
    const newUser = this.repo.create(user);
    console.log(user, 111);
    const savedUser = await this.repo.save(newUser);
    return savedUser;
  };
}

export default UsersRepository;
