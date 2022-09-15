import { container } from "tsyringe";

import type { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import type { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import type { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
