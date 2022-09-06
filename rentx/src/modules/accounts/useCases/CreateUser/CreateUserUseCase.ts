import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(
    @inject("UsersRepository")
    usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  async execute(data: ICreateUserDTO) {
    const { driver_license, email, name, password } = data;

    this.usersRepository.create({
      driver_license,
      email,
      name,
      password,
    });
  }
}

export { CreateUserUseCase };
