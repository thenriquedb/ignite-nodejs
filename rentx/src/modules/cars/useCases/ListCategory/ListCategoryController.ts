import { Request, Response } from "express";

import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController {
  private listCategoryUseCase: ListCategoryUseCase;

  constructor(listCategoryUseCase: ListCategoryUseCase) {
    this.listCategoryUseCase = listCategoryUseCase;
  }

  async handle(_: Request, response: Response) {
    const categories = await this.listCategoryUseCase.execute();
    return response.status(200).json(categories);
  }
}

export { ListCategoryController };
