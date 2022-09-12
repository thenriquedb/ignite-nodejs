import { faker } from "@faker-js/faker";

import { AppError } from "@shared/errors/AppError";

import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe("CreateSpecificationUseCase", () => {
  beforeEach(() => {
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationRepositoryInMemory
    );
  });

  it("should be able to create new specification", async () => {
    const name = faker.name.fullName();

    await createSpecificationUseCase.execute({
      name,
      description: faker.lorem.sentence(),
    });

    const specificationCreated =
      await specificationRepositoryInMemory.findByName(name);

    expect(specificationCreated).toHaveProperty("id");
  });

  it("should not be able to create a new specification with name exists", () => {
    expect(async () => {
      const name = faker.name.fullName();

      await createSpecificationUseCase.execute({
        name,
        description: faker.lorem.sentence(),
      });

      await createSpecificationUseCase.execute({
        name,
        description: faker.lorem.sentence(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
