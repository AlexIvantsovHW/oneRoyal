"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCasinosByCountryCodeController = void 0;
const getAllCasinosByCountryCodeController = async (pool, req, res) => {
    const { country_code } = req.params;
    const { limit = "10", page = "1", sort = "DESC" } = req.query;
    if (!country_code) {
        return res.status(400).json({
            error: `Country code was not provided!`,
        });
    }
    const parsedLimit = parseInt(limit, 10) || 10;
    const parsedPage = parseInt(page, 10) || 1;
    console.log("---------get all casinos by country code start request---------");
    try {
        const countryCodeIdsRequest = await pool.query(`SELECT id FROM country_codes WHERE country_code='${country_code}'`);
        console.log(countryCodeIdsRequest.rows);
        if (countryCodeIdsRequest.rowCount === 0) {
            return res.status(201).json({
                message: "There is no country code",
            });
        }
        const queryResult = await pool.query(`SELECT  
  c.id AS casino_id,
  c.title,
  c.link,
  c.logo_img,
  c.casino_rate,
  c.link,
  
  COALESCE(
    json_agg(DISTINCT jsonb_build_object('id', b.id, 'bonus', b.bonus)) 
    FILTER (WHERE b.id IS NOT NULL), 
    '[]'
  ) AS bonuses,
  
  COALESCE(
    json_agg(DISTINCT jsonb_build_object('id', f.id, 'feature', f.feature)) 
    FILTER (WHERE f.id IS NOT NULL), 
    '[]'
  ) AS features,

  COALESCE(
    json_agg(DISTINCT jsonb_build_object('id', p.id, 'payment', p.payment,'payment_link',p.payment_link)) 
    FILTER (WHERE p.id IS NOT NULL), 
    '[]'
  ) AS payments,
  
  CAST(rcc.country_code_id AS INTEGER) AS country_code_id, -- Преобразуем к числу
  cc.country_code,
  CAST(rc.country_id AS INTEGER) AS country_id,           -- Преобразуем к числу
  ctry.country AS country
FROM casinos c
LEFT JOIN "rel.casino-payment" rcp ON c.id = rcp.casino_id
LEFT JOIN payments p ON rcp.payment_id = p.id
LEFT JOIN "rel.casino-country_code" rcc ON c.id = rcc.casino_id
LEFT JOIN country_codes cc ON rcc.country_code_id = cc.id
LEFT JOIN "rel.casino-country" rc ON c.id = rc.casino_id
LEFT JOIN countries ctry ON rc.country_id = ctry.id
LEFT JOIN "rel.casino_bonus" rcb ON c.id = rcb.casino_id
LEFT JOIN bonuses b ON b.id = rcb.bonus_id
LEFT JOIN "rel.casino-feature" rcf ON c.id = rcf.casino_id
LEFT JOIN features f ON f.id = rcf.feature_id
WHERE rcc.country_code_id = $1
GROUP BY 
  c.id, c.title, c.link, c.logo_img, c.casino_rate, 
  rcc.country_code_id, cc.country_code, rc.country_id, ctry.country
ORDER BY c.casino_rate ${sort} 
LIMIT $2 OFFSET $3;


      `, [
            countryCodeIdsRequest.rows[0].id,
            parsedLimit,
            (parsedPage - 1) * parsedLimit,
        ]);
        console.log(queryResult.rows);
        console.log("---------get all casinos by country end request---------");
        if (queryResult.rows.length === 0) {
            return res.status(204).send({ message: "There is no data" });
        }
        const result = queryResult.rows;
        return res.json({
            data: result,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};
exports.getAllCasinosByCountryCodeController = getAllCasinosByCountryCodeController;
