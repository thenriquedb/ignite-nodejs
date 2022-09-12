import { faker } from "@faker-js/faker";

import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "../CreateCategory/CreateCategoryUseCase";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let listCategoryUseCase: ListCategoryUseCase;
let createCategoryUseCase: CreateCategoryUseCase;

describe("ListCategoryUseCase", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCategoryUseCase = new ListCategoryUseCase(categoriesRepositoryInMemory);
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should return empty array by default", async () => {
    const categories = await listCategoryUseCase.execute();
    expect(categories.length).toBe(0);
  });

  it("should return created categories", async () => {
    await createCategoryUseCase.execute({
      name: faker.name.fullName(),
      description: faker.lorem.sentence(),
    });

    const categoies = await listCategoryUseCase.execute();
    expect(categoies.length).toBe(1);
  });
});
