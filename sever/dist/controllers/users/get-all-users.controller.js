"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersController = void 0;
const getAllUsersController = async (pool, req, res) => {
    console.log("---------get all users  start  request---------");
    try {
        const queryResult = await pool.query(`
    SELECT * FROM users
    `);
        const result = queryResult.rows;
        if (result.length === 0) {
            res.status(204).send({ message: "There is users in the database" });
        }
        console.log("---------get all users end request---------");
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
exports.getAllUsersController = getAllUsersController;
