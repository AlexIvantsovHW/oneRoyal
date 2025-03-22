"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCasinoController = void 0;
const deleteCasinoController = async (pool, req, res) => {
    const { id } = req.params;
    try {
        console.log("---------delete casino  start request---------");
        await pool.query("DELETE FROM casinos WHERE id = $1", [id]);
        console.log("---------delete casino  start end---------");
        res.json({ message: "Casino deleted successfully" });
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
exports.deleteCasinoController = deleteCasinoController;
