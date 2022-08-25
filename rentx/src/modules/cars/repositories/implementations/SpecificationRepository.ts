import { Specification } from "@modules/cars/entities/Specification";
import { getRepository, Repository } from "typeorm";

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ description, name }: ICreateSpecificationDTO) {
    const specification = this.repository.create({ name, description });
    await this.repository.save(specification);
  }

  async findByName(name: string) {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  async list() {
    const specifications = await this.repository.find();
    return specifications;
  }
}

export { SpecificationRepository };
