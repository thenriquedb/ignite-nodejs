import { faker } from "@faker-js/faker";
import { AppError } from "@shared/errors/AppError";

import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("AuthenticateUserUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it("should able authenticate user correctly", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await createUserUseCase.execute({
      driver_license: faker.random.numeric(8),
      email,
      name: faker.name.fullName(),
      password,
    });

    const authenticatedUser = await authenticateUserUseCase.execute({
      email,
      password,
    });

    expect(authenticatedUser).toHaveProperty("token");
  });

  it("should be not able to authenticate non existent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to authenticate with incorret password", () => {
    expect(async () => {
      const email = faker.internet.email();

      await createUserUseCase.execute({
        driver_license: faker.random.numeric(8),
        email,
        name: faker.name.fullName(),
        password: faker.internet.password(),
      });

      await authenticateUserUseCase.execute({
        email,
        password: "incorret_password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
