"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountryCasinosRouter = void 0;
const i = __importStar(require("./imports"));
const getAllCountryCasinosRouter = (pool) => {
    const router = i.express.Router();
    router.get("/country/:country_id", async (req, res) => {
        console.log(`------------CASINO BY COUNTRY CODE REQUEST IS STARTED-------------`);
        const { country_id } = req.params; // Извлекаем country_id из параметров
        const { country_code_id, limit = 10, page = 1, sort = "ASC" } = req.query; // Извлекаем country_code_id из параметров запроса
        if (!country_id /* || !country_id */) {
            res
                .status(400)
                .send({ message: "There is no country code/ country id" });
        }
        try {
            const result = await pool.query(`SELECT * FROM casinos 
           WHERE country_code_id=${country_id} 
           ORDER BY rate ${sort} 
           LIMIT ${limit}`);
            if (result.rows.length === 0) {
                res.status(201).send({ message: "There is no casinos" });
            }
            const countResult = await pool.query(`SELECT COUNT(*) FROM casinos 
           WHERE country_code_id=${country_code_id} AND country_id=${country_id}`);
            if (countResult.rows.length === 0) {
                res.status(201).send({ message: "There is now casionos" });
            }
        }
        catch (e) { }
        // Извлечение и приведение параметров
        /*   const limit =
          typeof req.query.limit === "string" ? req.query.limit : "10"; // Если limit строка, используем ее, иначе берем значение по умолчанию
        const page = typeof req.query.page === "string" ? req.query.page : "1"; // Если page строка, используем ее, иначе берем значение по умолчанию
        const sort = typeof req.query.sort === "string" ? req.query.sort : "desc"; // Если sort строка, используем ее, иначе берем значение по умолчанию
   */
        // Приводим limit и page к числу
        /*       const limitValue = parseInt(limit, 10) || 10; // Количество записей на странице
        const pageValue = parseInt(page, 10) || 1;
        const offset = (pageValue - 1) * limitValue; // Смещение для страницы
   */
        // Приведение сортировки к нижнему регистру и проверка направления
        //      const orderDirection = sort.toLowerCase() === "asc" ? "ASC" : "DESC";
        try {
            // Запрос для получения казино с указанным country_id и (опционально) country_code_id, с пагинацией и сортировкой
            // const queryParameters = [country_id];
            const queryConditions = [`country_id = $1`];
            if (typeof country_code_id === "string") {
                // queryParameters.push(country_code_id);
                queryConditions.push(`country_code_id = $2`);
            }
            /*  const result = await pool.query(
              `SELECT * FROM casinos
               WHERE ${queryConditions.join(" AND ")}
               ORDER BY rate ${orderDirection}
               LIMIT $${queryParameters.length + 1} OFFSET $${
                queryParameters.length + 2
              }`,
              [...queryParameters, limitValue, offset]
            );
    
            // Запрос для подсчета общего количества казино в выбранной стране с (опционально) country_code_id
            const countResult = await pool.query(
              `SELECT COUNT(*) FROM casinos
               WHERE ${queryConditions.join(" AND ")}`,
              queryParameters
            );
     */
            // const totalCount = parseInt(countResult.rows[0].count, 10);
            // Проверяем, есть ли результаты
            /*     if (result.rows.length > 0) {
              // Обходим каждое казино и получаем связанные методы оплаты
              const casinosWithPayments = await Promise.all(
                result.rows.map(async (casino) => {
                  const paymentMethodsResult = await pool.query(
                    `SELECT p.id, p.payment_title, p.paymenturl
                     FROM payment p
                     JOIN casino_payment cp ON p.id = cp.payment_id
                     WHERE cp.casino_id = $1`,
                    [casino.id]
                  );
    
                  return {
                    ...casino,
                    payment_methods: paymentMethodsResult.rows.map(
                      (e) => e.paymenturl
                    ),
                  };
                })
              );
    
              res.status(200).json({
                data: casinosWithPayments, // Возвращаем казино с методами оплаты
                total: totalCount, // Общее количество казино для заданных фильтров
                currentPage: pageValue, // Текущая страница
                totalPages: Math.ceil(totalCount / limitValue), // Общее количество страниц
              });
            } else {
              res
                .status(404)
                .json({ message: "No casinos found for the specified filters" });
            } */
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch casinos" });
        }
    });
    return router;
};
exports.getAllCountryCasinosRouter = getAllCountryCasinosRouter;
