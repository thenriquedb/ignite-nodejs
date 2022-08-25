import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create: (data: ICreateCategoryDTO) => Promise<void>;
  findByName: (name: string) => Promise<Category | undefined>;
  list: () => Promise<Category[]>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
