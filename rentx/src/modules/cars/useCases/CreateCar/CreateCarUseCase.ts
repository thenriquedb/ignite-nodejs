import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  brand: string;
  category_id: string;
  daily_rate: number;
  description: string;
  fine_amount: number;
  license_plate: string;
  name: string;
}

@injectable()
class CreateCarUseCase {
  private carsRepository: ICarsRepository;

  constructor(
    @inject("CarsRepository")
    carsRepository: ICarsRepository
  ) {
    this.carsRepository = carsRepository;
  }

  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: IRequest) {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Already exists a car with this license plate");
    }

    const car = this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return car;
  }
}

export { CreateCarUseCase, IRequest };
