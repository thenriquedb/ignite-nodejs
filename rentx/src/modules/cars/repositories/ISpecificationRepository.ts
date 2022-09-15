import { ISpecification } from "../entities/ISpecification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create: (data: ICreateSpecificationDTO) => Promise<void>;
  findByName: (name: string) => Promise<ISpecification>;
  list: () => Promise<ISpecification[]>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
