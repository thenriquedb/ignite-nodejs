import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

class ListSpecificationUseCase {
  private specificationRepository: ISpecificationRepository;

  constructor(specificationRepository: ISpecificationRepository) {
    this.specificationRepository = specificationRepository;
  }

  execute() {
    const specifications = this.specificationRepository.list();
    return specifications;
  }
}

export { ListSpecificationUseCase };
