import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  private specifications: Specification[] = [];

  async create({ description, name }: ICreateSpecificationDTO) {
    const specification = new Specification();

    Object.assign(specification, { description, name });

    this.specifications.push(specification);
  }

  async findByName(name: string) {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  async list() {
    return this.specifications;
  }
}

export { SpecificationRepositoryInMemory };
