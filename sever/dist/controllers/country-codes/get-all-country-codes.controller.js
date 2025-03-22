"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountryCodesController = void 0;
const getAllCountryCodesController = async (pool, req, res) => {
    console.log("---------get all country codes start  request---------");
    try {
        const queryResult = await pool.query(`
    SELECT * FROM country_codes
    `);
        const result = queryResult.rows;
        if (result.length === 0) {
            res
                .status(204)
                .send({ message: "There is country codes in the database" });
        }
        console.log("---------get all country codes  end request---------");
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
exports.getAllCountryCodesController = getAllCountryCodesController;
