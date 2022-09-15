import { Category } from "@modules/cars/infra/typeorm/entities/Category";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async create(data: ICreateCategoryDTO) {
    const { name, description } = data;

    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }

  async findByName(name: string) {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }

  async list() {
    return this.categories;
  }
}

export { CategoriesRepositoryInMemory };
