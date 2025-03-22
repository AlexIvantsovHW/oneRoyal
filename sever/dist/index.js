"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("./app");
const PORT = process.env.PORT || 3000;
app_1.app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
