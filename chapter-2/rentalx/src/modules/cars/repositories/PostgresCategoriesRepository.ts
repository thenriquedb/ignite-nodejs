import { Category } from "../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName: (name: string) => Category;
  list: () => Category[];
  create: (data: ICreateCategoryDTO) => void;
}

export { PostgresCategoriesRepository };
