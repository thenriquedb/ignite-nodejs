import { createCategoryController } from "@modules/cars/useCases/CreateCategory";
import { Router } from "express";

const categoriesRoutes = Router();

categoriesRoutes.get("/", (_, response) => {
  // const categories = categoriesRepository.list();
  // return response.json(categories);
});

categoriesRoutes.post("/", (request, response) =>
  createCategoryController.handle(request, response)
);

export { categoriesRoutes };
