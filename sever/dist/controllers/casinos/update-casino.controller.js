"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCasinoController = void 0;
const updateCasinoController = async (pool, req, res) => {
    const { id } = req.params;
    const { title, link, logo_img, casino_rate, features, bonuses } = req.body;
    try {
        await pool.query("BEGIN");
        await pool.query(`UPDATE casinos
       SET title = $1, link = $2, logo_img = $3, casino_rate = $4
       WHERE id = $5`, [title, link, logo_img, casino_rate, id]);
        if (features) {
            await pool.query('DELETE FROM "rel.casino-feature" WHERE casino_id = $1', [id]);
            for (const feature of features) {
                await pool.query('INSERT INTO "rel.casino-feature" (casino_id, feature_id) VALUES ($1, $2)', [id, feature]);
            }
        }
        if (bonuses) {
            await pool.query('DELETE FROM "rel.casino-bonus" WHERE casino_id = $1', [
                id,
            ]);
            for (const bonus of bonuses) {
                await pool.query('INSERT INTO "rel.casino-bonus" (casino_id, bonus_id) VALUES ($1, $2)', [id, bonus]);
            }
        }
        await pool.query("COMMIT");
        res.json({ message: "Casino updated successfully" });
    }
    catch (error) {
        await pool.query("ROLLBACK");
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};
exports.updateCasinoController = updateCasinoController;
