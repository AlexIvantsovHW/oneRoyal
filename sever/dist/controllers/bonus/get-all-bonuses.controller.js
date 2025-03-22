"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBonusesController = void 0;
const getAllBonusesController = async (pool, req, res) => {
    console.log("---------get all bonuses start  request---------");
    try {
        const queryResult = await pool.query(`
    SELECT * FROM bonuses
    `);
        const result = queryResult.rows;
        if (result.length === 0) {
            res.status(204).send({ message: "There is bonuses in the database" });
        }
        console.log("---------get all bonuses end request---------");
        res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};
exports.getAllBonusesController = getAllBonusesController;
