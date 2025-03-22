import * as i from "./imports";

export const getAllCasinosRouter = (pool: i.Pool): i.Router => {
  const router = i.express.Router();
  router.get("/", async (req: i.Request, res: i.Response) => {
    const { limit, page, sort } = req.body;
    const limitValue = limit || 10;
    const offset = (page ? page : 1 - 1) * limitValue;
    const orderDirection = !sort ? "ASC" : sort.toUpperCase(); // Определяем направление сортировки
    try {
      console.log("--------GET ALL CASINOS REQUEST START-----------");
      // Запрос для получения данных с пагинацией и сортировкой по casino_rate
      const result = await pool.query(
        `SELECT * FROM casinos ORDER BY rate ${orderDirection} LIMIT $1 OFFSET $2`,
        [limitValue, offset]
      );
      if (result.rows.length === 0) {
        res.status(201).send({ message: "Casinos data is empty" });
      }
      // Запрос для подсчета общего количества записей
      const countResult = await pool.query("SELECT COUNT(*) FROM casinos");
      if (countResult.rows.length === 0)
        res
          .status(201)
          .send({ message: "Casinos cannot be counted, table is empty" });
      const totalCount = parseInt(countResult.rows[0].count);
      console.log("--------GET ALL CASINOS REQUEST FINISH-----------");
      res.status(200).json({
        data: result.rows,
        total: totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limitValue),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch casinos" });
    }
  });

  return router;
};
