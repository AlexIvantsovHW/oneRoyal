"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCasinosByCountryController = void 0;
const getCasinosByCountryController = async (pool, req, res) => {
    const { country_code_id } = req.params;
    console.log("---------get all casinos by country start request---------");
    try {
        const queryResult = await pool.query(`SELECT  
         c.id AS casino_id,
         c.title,
         c.link,
         c.logo_img,
         c.casino_rate,
         
         COALESCE(json_agg(DISTINCT jsonb_build_object('id', b.id, 'title', b.title)) 
                   FILTER (WHERE b.id IS NOT NULL), '[]') AS bonuses,
         COALESCE(json_agg(DISTINCT jsonb_build_object('id', f.id, 'feature', f.feature)) 
                   FILTER (WHERE f.id IS NOT NULL), '[]') AS features,
         
         rcc.country_code_id,
         cc.country_code,
         rc.country_id,
         ctry.country AS country
       FROM casinos c
       LEFT JOIN "rel.casino-country_code" rcc ON c.id = rcc.casino_id
       LEFT JOIN country_codes cc ON rcc.country_code_id = cc.id  -- assuming the country_codes table contains country_code column
       LEFT JOIN "rel.casino-country" rc ON c.id = rc.casino_id  -- join with the rel.casino-country table to get country_id
       LEFT JOIN countries ctry ON rc.country_id = ctry.id  -- join with countries table to get country name
       LEFT JOIN "rel.casino_bonus" rcb ON c.id = rcb.casino_id
       LEFT JOIN bonuses b ON b.id = rcb.bonus_id
       LEFT JOIN "rel.casino-feature" rcf ON c.id = rcf.casino_id
       LEFT JOIN features f ON f.id = rcf.feature_id
       WHERE rcc.country_code_id = $1
       GROUP BY c.id, c.title, c.link, c.logo_img, c.casino_rate, rcc.country_code_id, cc.country_code, rc.country_id, ctry.country
      `, [country_code_id]);
        console.log("---------get all casinos by country end request---------");
        const result = queryResult.rows;
        if (queryResult.rows.length === 0) {
            res.status(204).send({ message: "There is no data" });
        }
        res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};
exports.getCasinosByCountryController = getCasinosByCountryController;
