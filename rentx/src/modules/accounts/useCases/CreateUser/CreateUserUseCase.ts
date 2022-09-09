import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { BCrypt } from "../../utils/BCrypt";

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

    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      throw new Error("User already exits");
    }

    const passwordHash = await BCrypt.hash(password, 8);

    this.usersRepository.create({
      driver_license,
      email,
      name,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
