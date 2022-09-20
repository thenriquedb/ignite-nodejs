import type { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase, IRequest } from "./CreateCarUseCase";

class CreateCarController {
  async handle(request: Request<void, void, IRequest>, response: Response) {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const createdCar = await createCarUseCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return response.status(201).json(createdCar);
  }
}

export { CreateCarController };
