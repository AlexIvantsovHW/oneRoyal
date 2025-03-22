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
exports.getAllCasinosRouter = void 0;
const i = __importStar(require("./imports"));
const getAllCasinosRouter = (pool) => {
    const router = i.express.Router();
    router.get("/", async (req, res) => {
        const { limit, page, sort } = req.body;
        const limitValue = limit || 10;
        const offset = (page ? page : 1 - 1) * limitValue;
        const orderDirection = !sort ? "ASC" : sort.toUpperCase(); // Определяем направление сортировки
        try {
            console.log("--------GET ALL CASINOS REQUEST START-----------");
            // Запрос для получения данных с пагинацией и сортировкой по casino_rate
            const result = await pool.query(`SELECT * FROM casinos ORDER BY rate ${orderDirection} LIMIT $1 OFFSET $2`, [limitValue, offset]);
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
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch casinos" });
        }
    });
    return router;
};
exports.getAllCasinosRouter = getAllCasinosRouter;
