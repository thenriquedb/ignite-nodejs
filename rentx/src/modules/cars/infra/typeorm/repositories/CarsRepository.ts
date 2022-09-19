import { getRepository, Repository } from "typeorm";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import type {
  ICarsRepository,
  ICreateCarDTO,
} from "@modules/cars/repositories/ICarsRepository";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: ICreateCarDTO) {
    const {
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    } = data;

    const car = this.repository.create({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string) {
    const car = await this.repository.findOne({ license_plate: licensePlate });
    return car;
  }

  async list() {
    const cars = await this.repository.find();
    return cars;
  }
}

export { CarsRepository };
