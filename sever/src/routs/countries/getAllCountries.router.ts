import * as i from "./imports";

export const getAllCountries = (
  pool: i.Pool,
  req: unknown,
  res: unknown
): i.Router => {
  const router = i.express.Router();
  router.get("/", async (req: i.Request, res: i.Response) => {
    try {
      const countriesRequest = await pool.query(`SELECT * FROM countries`);
      if (countriesRequest.rows.length === 0) {
        res
          .status(201)
          .send({ message: "There is not countries in database  " });
      }
      res.json(countriesRequest.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch countries" });
    }
  });

  return router;
};
