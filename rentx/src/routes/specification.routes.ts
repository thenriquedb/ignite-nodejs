import { createSpecificationController } from "@modules/cars/useCases/CreateSpecification";
import { listSpecificationController } from "@modules/cars/useCases/ListSpecification";
import { Router } from "express";

const specificationRoutes = Router();

specificationRoutes.get("/", (request, response) =>
  listSpecificationController().handle(request, response)
);

specificationRoutes.post("/", (request, response) =>
  createSpecificationController().handle(request, response)
);

export { specificationRoutes };
