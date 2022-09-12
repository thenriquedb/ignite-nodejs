import { faker } from "@faker-js/faker";
import { BCrypt } from "@modules/accounts/utils/BCrypt";

import { AppError } from "@shared/errors/AppError";

import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("CreateUserUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create new user", async () => {
    const email = faker.internet.email();

    await createUserUseCase.execute({
      driver_license: faker.random.numeric(8),
      email,
      name: faker.name.fullName(),
      password: faker.internet.password(),
    });

    const createdUser = await usersRepositoryInMemory.findByEmail(email);

    expect(createdUser).toHaveProperty("id");
  });

  it("should not be able to create user with exists email", async () => {
    await expect(async () => {
      const email = faker.internet.email();

      await createUserUseCase.execute({
        driver_license: faker.random.numeric(8),
        email,
        name: faker.name.fullName(),
        password: faker.internet.password(),
      });

      await createUserUseCase.execute({
        driver_license: faker.random.numeric(8),
        email,
        name: faker.name.fullName(),
        password: faker.internet.password(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be encrypt password", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await createUserUseCase.execute({
      driver_license: faker.random.numeric(8),
      email,
      name: faker.name.fullName(),
      password,
    });

    const createdUser = await usersRepositoryInMemory.findByEmail(email);
    expect(BCrypt.compare(createdUser.password, password)).toBeTruthy();
  });
});
