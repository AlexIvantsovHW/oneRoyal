import { Request, Response } from "express";
import { UsersService } from "../../service/user/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { emailValidator, passwordValidator } from "../imports";

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

      if (!emailValidator(email)) {
        return res.status(400).json({ message: "Incorrect email format" });
      }

      if (!passwordValidator(password)) {
        return res.status(400).json({ message: "Incorrect password format" });
      }

      const userExist = await this.usersService.findByUsername(username);
      const emailExist = await this.usersService.findByEmail(email);

      if (userExist || emailExist) {
        return res
          .status(400)
          .json({ message: "Such username or email is already used" });
      }

      const passwordQuery = await this.usersService.findAll();
      const passwords = passwordQuery.map((user) => user.password);

      for (const existingPassword of passwords) {
        const isMatch = await bcrypt.compare(password, existingPassword);
        if (isMatch) {
          return res.status(409).send({
            message:
              "Please choose a different password, this one is already used.",
          });
        }
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await this.usersService.createUser(
        email,
        username,
        hashedPassword
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

  loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email && !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }
      const user = await this.usersService.findByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const payload = { userId: user.id, username: user.username };
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET || "your_secret_key",
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user_id: user.id,
      });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
