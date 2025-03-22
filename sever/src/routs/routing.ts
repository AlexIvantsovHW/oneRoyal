import * as i from "./imports";

// USERS
export const userRoutes = (poolAdmin: i.Pool) => {
  const router = i.Router();
  router.get("/", (req, res) => i.getAllUsersController(poolAdmin, req, res));
  router.post("/create", async (req, res) => {
    await i.createUserController(poolAdmin, req, res);
  });
  router.post("/login", async (req, res) => {
    await i.loginUserController(poolAdmin, req, res);
  });
  return router;
};
