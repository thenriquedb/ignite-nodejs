import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create: (data: ICreateCategoryDTO) => void;
  findByName: (name: string) => Category | undefined;
  list: () => Category[];
}

export { ICategoriesRepository, ICreateCategoryDTO };
