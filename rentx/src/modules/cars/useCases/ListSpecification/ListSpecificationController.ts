import { Request, Response } from "express";

import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

class ListSpecificationController {
  private listSpecificationUseCase: ListSpecificationUseCase;

  constructor(listSpecificationUseCase: ListSpecificationUseCase) {
    this.listSpecificationUseCase = listSpecificationUseCase;
  }

  handle(_: Request, response: Response) {
    const specifications = this.listSpecificationUseCase.execute();
    return response.json(specifications);
  }
}

export { ListSpecificationController };
