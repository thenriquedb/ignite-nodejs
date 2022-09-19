import { ICar } from "@modules/cars/entities/ICar";

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
  create: (data: ICreateCarDTO) => Promise<ICar>;
  list: () => Promise<ICar[]>;
  findByLicensePlate: (licensePlate: string) => Promise<ICar>;
}

export { ICarsRepository, ICreateCarDTO };
