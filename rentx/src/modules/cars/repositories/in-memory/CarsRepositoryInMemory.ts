import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import {
  ICarsRepository,
  ICreateCarDTO,
} from "@modules/cars/repositories/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

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

    const car = new Car();

    Object.assign(car, {
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string) {
    const car = this.cars.find((car) => car.license_plate === licensePlate);
    return car;
  }

  async list() {
    return this.cars;
  }
}

export { CarsRepositoryInMemory };
