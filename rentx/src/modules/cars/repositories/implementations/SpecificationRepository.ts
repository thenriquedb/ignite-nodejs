import { Category } from "@modules/cars/model/Category";
import { Specification } from "@modules/cars/model/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];
  private static INSTANCE: SpecificationRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }

    return SpecificationRepository.INSTANCE;
  }

  create({ description, name }: ICreateSpecificationDTO) {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);
  }

  findByName(name: string): Category | undefined {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  list(): Category[] {
    return this.specifications;
  }
}

export { SpecificationRepository };
