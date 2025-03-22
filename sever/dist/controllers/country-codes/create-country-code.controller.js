"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCountryCodeController = void 0;
const createCountryCodeController = async (pool, req, res) => {
    const { country_id, country_code } = req.body;
    if (!country_id) {
        return res.status(401).send({ message: "Country id was not provided" });
    }
    if (!country_code) {
        return res.status(401).send({ message: "Country code was not provided" });
    }
    console.log("---------create country code start request---------");
    try {
        //checking existing country code in data base
        const existingCountryCodeRequest = await pool.query("SELECT id FROM country_codes WHERE country_code=$1", [country_code]);
        if (existingCountryCodeRequest?.rowCount > 0) {
            console.log("There is already a country code for the specific country in the database");
            return res.status(409).send({
                message: "There is already a country code for the specific country in the database",
                id: existingCountryCodeRequest.rows[0].id,
            });
        }
        await pool.query("BEGIN");
        // Вставка нового кода страны
        const countryCodeRequest = await pool.query(`INSERT INTO country_codes (country_code) VALUES ($1) RETURNING id`, [country_code] // Используем параметр для предотвращения SQL-инъекций
        );
        if (countryCodeRequest.rowCount === 0) {
            console.log("There is already a country code for the specific country in the database");
            return res.status(204).send({
                message: "There is already a country code for the specific country in the database",
            });
        }
        const result = countryCodeRequest.rows;
        const country_code_id = result[0].id; // Получаем ID добавленного кода страны
        // Вставка связи между страной и кодом
        const countryCodeCountryRequest = await pool.query(`INSERT INTO "rel.countries_country_codes" (country_code_id, country_id) VALUES ($1, $2) RETURNING id`, [country_code_id, +country_id]);
        await pool.query("COMMIT");
        console.log("---------create country code start request end request---------");
        res.json({
            message: `Country code ${country_code} is created successfully!`,
            id: countryCodeCountryRequest.rows[0].id,
        });
    }
    catch (error) {
        await pool.query("ROLLBACK");
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};
exports.createCountryCodeController = createCountryCodeController;
