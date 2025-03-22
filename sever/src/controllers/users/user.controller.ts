import { Request, Response } from "express";
import { UsersService } from "../../service/user/user.service";

export class UsersController {
  constructor(private usersService: UsersService) {}

  getAllUsers = async (req: Request, res: Response) => {
    const users = await this.usersService.findAll();
    return res.json(users);
  };

  getUserById(req: Request, res: Response) {
    const user = this.usersService.findById(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  }
  createUser = async (req: Request, res: Response) => {
    try {
      const { email, username, password } = req.body;

      if (!email || !username || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await this.usersService.createUser(
        email,
        username,
        password
      );

      return res.status(201).json({
        message: `User ${user.username} was successfully created!`,
        user,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
