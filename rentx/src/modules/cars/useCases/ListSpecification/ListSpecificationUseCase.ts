import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

@injectable()
class ListSpecificationUseCase {
  private specificationRepository: ISpecificationRepository;

  constructor(
    @inject("SpecificationRepository")
    specificationRepository: ISpecificationRepository
  ) {
    this.specificationRepository = specificationRepository;
  }

  async execute() {
    const specifications = await this.specificationRepository.list();
    return specifications;
  }
}

export { ListSpecificationUseCase };
