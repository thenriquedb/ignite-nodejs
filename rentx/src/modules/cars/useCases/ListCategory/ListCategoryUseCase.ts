import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ListCategoryUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  execute() {
    return this.categoriesRepository.list();
  }
}

export { ListCategoryUseCase };
