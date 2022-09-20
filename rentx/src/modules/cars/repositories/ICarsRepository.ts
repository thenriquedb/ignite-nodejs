import { ICar } from "@modules/cars/entities/ICar";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface ICreateCarDTO {
  brand: string;
  category_id: string;
  daily_rate: number;
  description: string;
  fine_amount: number;
  license_plate: string;
  name: string;
}

interface ICarsRepository {
  create: (data: ICreateCarDTO) => Promise<Car>;
  list: () => Promise<Car[]>;
  findByLicensePlate: (licensePlate: string) => Promise<Car>;
}

export { ICarsRepository, ICreateCarDTO };
