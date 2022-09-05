import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
class ListCategoryUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(
    @inject("CategoriesRepository")
    categoriesRepository: ICategoriesRepository
  ) {
    this.categoriesRepository = categoriesRepository;
  }

  execute() {
    return this.categoriesRepository.list();
  }
}

export { ListCategoryUseCase };
