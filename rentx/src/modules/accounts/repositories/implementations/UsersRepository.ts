import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UserRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: ICreateUserDTO) {
    const { driver_license, email, name, password, username } = data;

    const user = this.repository.create({
      driver_license,
      email,
      name,
      password,
      username,
    });

    await this.repository.save(user);
  }
}

export { UserRepository };
