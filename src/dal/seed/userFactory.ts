import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { UserEntity } from "../entity/user.ts";
import { Factory } from "../../types/factory.interface.ts";

class UserFactory extends Factory<UserEntity>{
  constructor(){
    super()
    this.entity = UserEntity
  }
  async createEntity ():Promise<UserEntity> {
    const user = new UserEntity();
    user.email = faker.internet.email();
    const password = faker.random.word();
    const encryptedPassword = await bcrypt.hash(password, 10)
    user.password = encryptedPassword
    return user;
  }
}

export default UserFactory;
