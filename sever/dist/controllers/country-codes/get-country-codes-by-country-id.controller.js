"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryCodesByCountryIdController = void 0;
const getCountryCodesByCountryIdController = async (pool, req, res) => {
    const { country_id } = req.params;
    console.log(country_id);
    if (!country_id)
        return res.status(401).send({ message: "Country id was not provided" });
    console.log("---------get country code by country id start  request1---------");
    try {
        const queryResult = await pool.query(`
      SELECT rcc.country_code_id,c.country, cc.country_code, rcc.country_id,rcc.id 
      FROM "rel.countries_country_codes" rcc
      LEFT JOIN "country_codes" cc ON rcc.country_code_id = cc.id
      LEFT JOIN "countries" c ON rcc.country_id=c.id
      WHERE rcc.country_id = ${+country_id}
    `);
        const result = queryResult.rows;
        if (queryResult.rowCount === 0) {
            console.log("There is country code to the specific country  in the database");
            return res.status(204).send({
                message: "There is country code to the specific country  in the database",
            });
        }
        console.log("---------get country code by country id end request---------");
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
exports.getCountryCodesByCountryIdController = getCountryCodesByCountryIdController;
