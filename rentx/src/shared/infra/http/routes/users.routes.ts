import { Router } from "express";

import { CreateUserController } from "@modules/accounts/useCases/CreateUser/CreateUserController";

const createUserController = new CreateUserController();

const usersRoutes = Router();

usersRoutes.post("/", createUserController.handle);

export { usersRoutes };
