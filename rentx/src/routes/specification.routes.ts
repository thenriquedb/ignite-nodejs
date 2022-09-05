import { CreateSpecificationController } from "@modules/cars/useCases/CreateSpecification/CreateSpecificationController";
import { ListSpecificationController } from "@modules/cars/useCases/ListSpecification/ListSpecificationController";
import { Router } from "express";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationRoutes.get("/", listSpecificationController.handle);

specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
