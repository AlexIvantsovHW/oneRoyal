"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryCodeByCountryIdController = void 0;
const getCountryCodeByCountryIdController = async (pool, req, res) => {
    const { country_id } = req.body;
    if (!country_id)
        return res.status(401).send({ message: "Country id was not provided" });
    console.log("---------get country code by country id start  request---------");
    try {
        const queryResult = await pool.query(`
    SELECT * FROM "rel.countries_country_codes" WHERE id=${country_id} 
    `);
        //const result: i.CountryCode[] = queryResult.rows as i.CountryCode[];
        const result = queryResult.rows;
        console.log(result);
        if (result.length === 0) {
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
exports.getCountryCodeByCountryIdController = getCountryCodeByCountryIdController;
