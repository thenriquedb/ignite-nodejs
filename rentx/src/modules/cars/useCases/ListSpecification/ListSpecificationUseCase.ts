import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

class ListSpecificationUseCase {
  private specificationRepository: ISpecificationRepository;

  constructor(specificationRepository: ISpecificationRepository) {
    this.specificationRepository = specificationRepository;
  }

  async execute() {
    const specifications = await this.specificationRepository.list();
    return specifications;
  }
}

export { ListSpecificationUseCase };
