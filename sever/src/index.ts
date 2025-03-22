import express, { Router } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import cors from "cors";
import bodyParser from "body-parser";
import { userRoutes } from "./routs/routing";

export { cors, Pool, express, dotenv, bodyParser, userRoutes };

dotenv.config();

const poolAdmin = new Pool({
  user: process.env.DB_USER_ADMIN,
  port: +process.env.DB_PORT,
  password: process.env.DB_PASSWORD_ADMIN,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
const PORT = 7001;
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes(poolAdmin));

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
module.exports = app;
