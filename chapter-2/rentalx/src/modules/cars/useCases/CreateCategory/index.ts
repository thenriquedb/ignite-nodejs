import { CategoriesRepository } from "@modules/cars/repositories/CategoriesRepository";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoriesRepository = new CategoriesRepository();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

export { createCategoryController };
