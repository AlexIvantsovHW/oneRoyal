require("reflect-metadata");
const { DataSource } = require("typeorm");
const dotenv = require("dotenv");
const { User } = require("../modules/users/entities/user.entity");

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER_ADMIN,
  password: process.env.DB_PASSWORD_ADMIN,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,

  entities: ["src/modules/**/entities/*.ts", User],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false,
  },
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("📦 Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};
