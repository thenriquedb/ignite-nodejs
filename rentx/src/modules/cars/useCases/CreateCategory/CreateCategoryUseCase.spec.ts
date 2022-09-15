import { faker } from "@faker-js/faker";
import { AppError } from "@shared/errors/AppError";

import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("CreateCategoryUseCase", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const name = faker.vehicle.type();

    await createCategoryUseCase.execute({
      name,
      description: faker.lorem.sentence(),
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(name);

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", () => {
    expect(async () => {
      const name = faker.vehicle.type();

      await createCategoryUseCase.execute({
        name,
        description: faker.lorem.sentence(),
      });

      await createCategoryUseCase.execute({
        name,
        description: faker.lorem.sentence(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
