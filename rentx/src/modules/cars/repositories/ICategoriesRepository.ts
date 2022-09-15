import { ICategory } from "../entities/ICategory";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create: (data: ICreateCategoryDTO) => Promise<void>;
  findByName: (name: string) => Promise<ICategory | undefined>;
  list: () => Promise<ICategory[]>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
