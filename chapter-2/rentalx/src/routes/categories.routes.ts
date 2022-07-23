import { createCategoryController } from "@modules/cars/useCases/CreateCategory";
import { listCategoryController } from "@modules/cars/useCases/ListCategory";
import { Router } from "express";

const categoriesRoutes = Router();

categoriesRoutes.get("/", (request, response) => {
  return listCategoryController.handle(request, response);
});

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

export { categoriesRoutes };
