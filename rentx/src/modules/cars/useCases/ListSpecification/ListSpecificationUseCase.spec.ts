import { faker } from "@faker-js/faker";

import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateSpecificationUseCase } from "../CreateSpecification/CreateSpecificationUseCase";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
let listSpecificationUseCase: ListSpecificationUseCase;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe("ListSpecificationUseCase", () => {
  beforeEach(() => {
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    listSpecificationUseCase = new ListSpecificationUseCase(
      specificationRepositoryInMemory
    );
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationRepositoryInMemory
    );
  });

  it("should return empty array by default", async () => {
    const specifications = await listSpecificationUseCase.execute();
    expect(specifications.length).toBe(0);
  });

  it("should return created specifications", async () => {
    await createSpecificationUseCase.execute({
      name: faker.name.fullName(),
      description: faker.lorem.sentence(),
    });

    const specifications = await listSpecificationUseCase.execute();
    expect(specifications.length).toBe(1);
  });
});
