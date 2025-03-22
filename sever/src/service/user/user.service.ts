import { AppDataSource } from "../../config/database";
import { User } from "../../modules/users/entities/user.entity";

import { Repository } from "typeorm";

export class UsersService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    console.log("Calling findAll...");
    try {
      const users = await this.userRepository.find();
      console.log("Users found:", users);
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(
    email: string,
    username: string,
    password: string
  ): Promise<User> {
    const user = this.userRepository.create({ email, username, password });
    return await this.userRepository.save(user);
  }
}
