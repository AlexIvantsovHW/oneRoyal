"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPaymentsController = void 0;
const getAllPaymentsController = async (pool, req, res) => {
    console.log("---------get all payments start  request---------");
    try {
        const queryResult = await pool.query(`
    SELECT * FROM payments
    `);
        const result = queryResult.rows;
        if (result.length === 0) {
            res.status(204).send({ message: "There is no payments in the database" });
        }
        console.log("---------get all payments end request---------");
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
exports.getAllPaymentsController = getAllPaymentsController;
