import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRepository = new CategoriesRepository();

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  private categoriesRepository: CategoriesRepository;

  constructor(categoriesRepository: CategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  execute({ description, name }: IRequest) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
