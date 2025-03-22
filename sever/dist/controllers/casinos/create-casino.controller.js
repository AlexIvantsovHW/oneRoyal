"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCasinoController = void 0;
const createCasinoController = async (pool, req, res) => {
  const {
    title,
    link,
    logo_img,
    casino_rate,
    features_ids,
    bonuses_ids,
    payments_ids,
    country_code_id,
    country_id,
  } = req.body;
  if (
    !title ||
    !link ||
    !logo_img ||
    !casino_rate ||
    !features_ids ||
    !bonuses_ids ||
    !country_code_id ||
    !country_id ||
    !payments_ids
  ) {
    res.status(400).json({ error: "Request body includes epmty data" });
  }
  try {
    console.log("---------create casino start  request---------");
    await pool.query("BEGIN");
    const result = await pool.query(
      `INSERT INTO casinos (title, link, logo_img, casino_rate)
         VALUES ($1, $2, $3, $4) RETURNING id`,
      [title, link, logo_img, casino_rate]
    );
    const casinoId = result.rows[0].id;
    if (features_ids) {
      for (const feature_id of features_ids) {
        await pool.query(
          'INSERT INTO "rel.casino-feature" (casino_id, feature_id) VALUES ($1, $2)',
          [casinoId, feature_id]
        );
      }
    }
    if (bonuses_ids) {
      for (const bonus_id of bonuses_ids) {
        await pool.query(
          'INSERT INTO "rel.casino_bonus" (casino_id, bonus_id) VALUES ($1, $2)',
          [casinoId, bonus_id]
        );
      }
    }
    if (payments_ids) {
      for (const payment_id of payments_ids) {
        await pool.query(
          'INSERT INTO "rel.casino-payment" (casino_id,payment_id ) VALUES ($1, $2)',
          [casinoId, payment_id]
        );
      }
    }
    if (country_code_id) {
      await pool.query(
        'INSERT INTO "rel.casino-country_code" (casino_id, country_code_id) VALUES ($1, $2)',
        [casinoId, country_code_id]
      );
    }
    if (country_id) {
      await pool.query(
        'INSERT INTO "rel.casino-country" (casino_id, country_id) VALUES ($1, $2)',
        [casinoId, country_id]
      );
    }
    await pool.query("COMMIT");
    console.log("---------create casino end  request---------");
    res.json({ message: "Casino created successfully", casinoId });
  } catch (error) {
    await pool.query("ROLLBACK");
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
exports.createCasinoController = createCasinoController;
