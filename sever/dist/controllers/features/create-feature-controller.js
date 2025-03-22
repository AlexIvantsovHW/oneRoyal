"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeatureController = void 0;
const createFeatureController = async (pool, req, res) => {
    console.log("---------get all features start  request---------");
    const { feature } = req.body;
    if (!feature) {
        return res.status(401).send({ message: "Feature  was not provided" });
    }
    console.log("---------create feature start request---------");
    try {
        //checking existing country code in data base
        const existingFeatureRequest = await pool.query("SELECT id FROM features WHERE feature=$1", [feature]);
        if (existingFeatureRequest?.rowCount > 0) {
            return res.status(409).send({
                message: "There is already a feature in the database",
                id: existingFeatureRequest.rows[0].id,
            });
        }
        await pool.query("BEGIN");
        const queryResult = await pool.query(`
    INSERT INTO features (feature) VALUES($1) RETURNING id
    `, [feature]);
        const result = queryResult.rows;
        if (result.length === 0) {
            res.status(204).send({ message: "There is features in the database" });
        }
        await pool.query("COMMIT");
        console.log("---------create feature end request---------");
        res.json({
            message: `Country code ${feature} is created successfully!`,
            id: result[0].id,
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
exports.createFeatureController = createFeatureController;
