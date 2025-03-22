import { Router } from "express";
import { UsersController } from "../../controllers/users/user.controller";
import { UsersService } from "../../service/user/user.service";

export class UsersModule {
  public router: Router;
  private usersController: UsersController;

  constructor() {
    const usersService = new UsersService();
    this.usersController = new UsersController(usersService);
    this.router = this.setupRoutes();
  }

  private setupRoutes(): Router {
    const router = Router();
    router.get(
      "/",
      this.usersController.getAllUsers.bind(this.usersController)
    );
    router.get(
      "/:id",
      this.usersController.getUserById.bind(this.usersController)
    );
    router.post(
      "/",
      this.usersController.createUser.bind(this.usersController)
    );
    return router;
  }
}
