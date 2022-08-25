import { Request, Response } from "express";

import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

class ListSpecificationController {
  private listSpecificationUseCase: ListSpecificationUseCase;

  constructor(listSpecificationUseCase: ListSpecificationUseCase) {
    this.listSpecificationUseCase = listSpecificationUseCase;
  }

  async handle(_: Request, response: Response) {
    const specifications = await this.listSpecificationUseCase.execute();
    return response.json(specifications);
  }
}

export { ListSpecificationController };
