"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFeatuesController = void 0;
const getAllFeatuesController = async (pool, req, res) => {
    console.log("---------get all features start  request---------");
    try {
        const queryResult = await pool.query(`
    SELECT * FROM features
    `);
        const result = queryResult.rows;
        if (result.length === 0) {
            res.status(204).send({ message: "There is features in the database" });
        }
        console.log("---------get all features end request---------");
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
exports.getAllFeatuesController = getAllFeatuesController;
