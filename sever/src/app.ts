import express, { Application } from "express";
import cors from "cors";
import { UsersModule } from "./modules/users/users.module";
import { connectDB } from "./config/database";

export class AppModule {
  public app: Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupModules();
    this.connectDatabase();
  }

  private setupMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private setupModules() {
    const usersModule = new UsersModule();
    this.app.use("/users", usersModule.router);
  }

  private async connectDatabase() {
    await connectDB();
  }
}

export const app = new AppModule().app;
