"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryByCountryCodeController = void 0;
const getCountryByCountryCodeController = async (pool, req, res) => {
    const { country_code } = req.params;
    console.log("---------get all countries start  request---------");
    if (!country_code) {
        return res.status(400).json({
            error: `Country code was not provided!`,
        });
    }
    try {
        const queryResult = await pool.query(`
      SELECT country_code, country 
      FROM country_codes cc
      LEFT JOIN countries c ON cc.id = c.id 
      WHERE country_code = '${country_code}'
    `);
        if (queryResult.rowCount === 0) {
            return res.status(200).json({
                message: `No countries were found with the country code: ${country_code}`,
                data: [],
            });
        }
        const result = queryResult.rows;
        console.log("---------get all countries end request---------");
        res.status(200).json({
            message: `No countries were found with the country code: ${country_code}`,
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
};
exports.getCountryByCountryCodeController = getCountryByCountryCodeController;
