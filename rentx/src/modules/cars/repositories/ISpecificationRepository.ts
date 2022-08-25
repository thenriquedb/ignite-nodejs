import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create: (data: ICreateSpecificationDTO) => Promise<void>;
  findByName: (name: string) => Promise<Specification>;
  list: () => Promise<Specification[]>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
