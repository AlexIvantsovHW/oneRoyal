import express, { Response, Request } from "express";
import { Pool } from "pg";
import { authRouter } from "./auth";
import { Router } from "express";

import {
  loginUserController,
  getAllUsersController,
  createUserController,
} from "../controllers/users";

export {
  express,
  Request,
  Response,
  Pool,
  authRouter,
  getAllUsersController,
  createUserController,
  loginUserController,
  Router,
};
