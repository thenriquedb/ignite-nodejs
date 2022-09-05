import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController {
  async handle(_: Request, response: Response) {
    const listCategoryUseCase = container.resolve(ListCategoryUseCase);
    const categories = await listCategoryUseCase.execute();
    return response.status(200).json(categories);
  }
}

export { ListCategoryController };
