import { CreateCategoryController } from "@modules/cars/useCases/CreateCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/ImportCategory/ImportCategoryController";
import { ListCategoryController } from "@modules/cars/useCases/ListCategory/ListCategoryController";
import { Router } from "express";
import multer from "multer";

const categoriesRoutes = Router();
const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.get("/", listCategoryController.handle);
categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
