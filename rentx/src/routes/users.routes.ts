import { CreateUserController } from "@modules/accounts/useCases/CreateUser/CreateUserController";
import { Router } from "express";

const createUserController = new CreateUserController();

const usersRoutes = Router();

usersRoutes.post("/", createUserController.handle);

export { usersRoutes };
