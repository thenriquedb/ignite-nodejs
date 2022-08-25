import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  private specificationRepository: ISpecificationRepository;

  constructor(specificationRepository: ISpecificationRepository) {
    this.specificationRepository = specificationRepository;
  }

  async execute({ name, description }: IRequest) {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw Error("Specification already exists");
    }

    await this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
