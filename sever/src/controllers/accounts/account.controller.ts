import { Request, Response } from "express";
import { AccountService } from "../../service/account/account.service";

export class AccountController {
  constructor(private accountService: AccountService) {}

  getAllAccounts = async (req: Request, res: Response) => {
    console.log("inside");
    try {
      const accounts = await this.accountService.findAll();
      return res.json(accounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  getAccountsByUserId = async (req: Request, res: Response) => {
    console.log("inside");
    const accounts = await this.accountService.findByUserId(
      parseInt(req.params.id)
    );
    if (!accounts) {
      return res.status(404).json({ message: "accounts not found" });
    }
    res.json(accounts);
  };
}
