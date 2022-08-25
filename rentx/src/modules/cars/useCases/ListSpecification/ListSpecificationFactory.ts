import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { ListSpecificationController } from "./ListSpecificationController";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

export default () => {
  const specificationRepository = new SpecificationRepository();

  const listSpecificationUseCase = new ListSpecificationUseCase(
    specificationRepository
  );

  const listSpecificationController = new ListSpecificationController(
    listSpecificationUseCase
  );

  return listSpecificationController;
};
