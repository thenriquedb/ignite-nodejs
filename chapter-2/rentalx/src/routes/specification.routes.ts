import { SpecificationRepository } from "@modules/cars/repositories/SpecificationRepository";
import { CreateSpecificationService } from "@modules/cars/services/CreateSpecificationService";
import { Router } from "express";

const specificationRoutes = Router();

const specificationRepository = new SpecificationRepository();

specificationRoutes.get("/", (_, response) => {
  const specifications = specificationRepository.list();
  return response.json(specifications);
});

specificationRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationRepository
  );
  createSpecificationService.execute({ name, description });

  return response.status(201).send();
});

export { specificationRoutes };
