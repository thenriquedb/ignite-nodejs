import { faker } from "@faker-js/faker";

import { AppError } from "@shared/errors/AppError";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: ICategoriesRepository;

describe("CreateCategoryUseCase", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const name = faker.name.fullName();

    await createCategoryUseCase.execute({
      name,
      description: faker.lorem.sentence(),
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(name);

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", () => {
    expect(async () => {
      const name = faker.name.fullName();

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
