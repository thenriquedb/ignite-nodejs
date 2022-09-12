import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  private specificationRepository: ISpecificationRepository;

  constructor(
    @inject("SpecificationRepository")
    specificationRepository: ISpecificationRepository
  ) {
    this.specificationRepository = specificationRepository;
  }

  async execute({ name, description }: IRequest) {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists");
    }

    await this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
