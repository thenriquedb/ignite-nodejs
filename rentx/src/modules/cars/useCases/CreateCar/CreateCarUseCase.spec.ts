import { faker } from "@faker-js/faker";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("CreateCarUseCase", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      brand: faker.vehicle.manufacturer(),
      category_id: faker.datatype.uuid(),
      daily_rate: faker.datatype.number(),
      description: faker.lorem.sentence(),
      fine_amount: faker.datatype.number(),
      license_plate: faker.vehicle.vrm(),
      name: faker.vehicle.model(),
    });
  });

  it("should be able to create a car with available true by default", async () => {
    const createdCar = await createCarUseCase.execute({
      brand: faker.vehicle.manufacturer(),
      category_id: faker.datatype.uuid(),
      daily_rate: faker.datatype.number(),
      description: faker.lorem.sentence(),
      fine_amount: faker.datatype.number(),
      license_plate: faker.vehicle.vrm(),
      name: faker.vehicle.model(),
    });

    expect(createdCar.available).toBeTruthy();
  });

  it("should not be able to create a car with exists license plate", async () => {
    await expect(async () => {
      const license_plate = faker.vehicle.vrm();

      await createCarUseCase.execute({
        brand: faker.vehicle.manufacturer(),
        category_id: faker.datatype.uuid(),
        daily_rate: faker.datatype.number(),
        description: faker.lorem.sentence(),
        fine_amount: faker.datatype.number(),
        name: faker.vehicle.model(),
        license_plate,
      });

      await createCarUseCase.execute({
        brand: faker.vehicle.manufacturer(),
        category_id: faker.datatype.uuid(),
        daily_rate: faker.datatype.number(),
        description: faker.lorem.sentence(),
        fine_amount: faker.datatype.number(),
        name: faker.vehicle.model(),
        license_plate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
