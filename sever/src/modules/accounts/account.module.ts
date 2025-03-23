import { Router } from "express";
import { AccountController } from "../../controllers/accounts/account.controller";
import { AccountService } from "../../service/account/account.service";

export class AccountModule {
  public router: Router;
  private accountController: AccountController;

  constructor() {
    const accountService = new AccountService();
    this.accountController = new AccountController(accountService);
    this.router = this.setupRoutes();
  }

  private setupRoutes(): Router {
    const router = Router();
    console.log("inse");
    router.get(
      "/",
      this.accountController.getAllAccounts.bind(this.accountController)
    );

    router.get(
      "/:id",
      this.accountController.getAccountsByUserId.bind(this.accountController)
    );

    return router;
  }
}
