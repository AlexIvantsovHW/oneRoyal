"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchCasinosRateController = void 0;
const switchCasinosRateController = async (pool, req, res) => {
    const { country_code_id } = req.params;
    const { casino_id, rate_update } = req.body;
    try {
        await pool.query("BEGIN");
        // Получаем список всех казино для текущего `country_code_id`
        const casinosRequest = await pool.query(`
      SELECT c.id, c.casino_rate, c.title,
             rcc.country_code_id
      FROM casinos c
      LEFT JOIN "rel.casino-country_code" rcc ON c.id = rcc.casino_id
      LEFT JOIN country_codes cc ON rcc.country_code_id = cc.id
      WHERE cc.id = $1
      ORDER BY c.casino_rate DESC
    `, [country_code_id]);
        if (casinosRequest.rows.length === 0) {
            await pool.query("COMMIT");
            res.json({
                message: "There are no casinos for the specified country code in the database",
            });
            return;
        }
        const casinos = casinosRequest.rows;
        const targetIndex = casinos.findIndex((casino) => casino.id === casino_id);
        if (targetIndex === -1) {
            await pool.query("COMMIT");
            res.status(404).json({ message: "Casino not found" });
            return;
        }
        if (rate_update && targetIndex === 0) {
            await pool.query("COMMIT");
            res.json({
                message: "Rate of the target casino cannot be increased further, it is already the top",
            });
            return;
        }
        if (!rate_update && targetIndex === casinos.length - 1) {
            await pool.query("COMMIT");
            res.json({
                message: "Rate of the target casino cannot be decreased further, it is already the lowest",
            });
            return;
        }
        const swapIndex = rate_update ? targetIndex - 1 : targetIndex + 1;
        const targetCasino = casinos[targetIndex];
        const neighborCasino = casinos[swapIndex];
        await pool.query(`
      UPDATE casinos
      SET casino_rate = $1
      WHERE id = $2
    `, [neighborCasino.casino_rate, targetCasino.id]);
        await pool.query(`
      UPDATE casinos
      SET casino_rate = $1
      WHERE id = $2
    `, [targetCasino.casino_rate, neighborCasino.id]);
        await pool.query("COMMIT");
        res.json({
            message: "Rating updated successfully",
            updatedCasinos: [
                { id: targetCasino.id, newRate: neighborCasino.casino_rate },
                { id: neighborCasino.id, newRate: targetCasino.casino_rate },
            ],
        });
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
exports.switchCasinosRateController = switchCasinosRateController;
