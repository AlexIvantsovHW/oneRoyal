import * as i from "./imports";

export const authRouter = (pool: i.Pool): i.Router => {
  const router = i.express.Router();
  router.get("/getWorks", async (req: i.Request, res: i.Response) => {
    try {
      const result = await pool.query("SELECT * FROM works");
      res.json(result.rows);
    } catch (error) {
      console.error("Ошибка при получении данных из базы данных:", error);
      res.status(500).send(`Server error: ${error}`);
    }
  });

  return router;
};
