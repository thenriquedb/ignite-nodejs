import { Specification } from "../model/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create: (data: ICreateSpecificationDTO) => void;
  findByName: (name: string) => Specification | undefined;
  list: () => Specification[];
}

export { ISpecificationRepository, ICreateSpecificationDTO };
