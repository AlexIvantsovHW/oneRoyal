"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRoutes = exports.userRoutes = exports.featureRoutes = exports.countryCodesRoutes = exports.countriesRoutes = exports.casinoRoutes = exports.bodyParser = exports.dotenv = exports.bonusRoutes = exports.express = exports.Pool = exports.cors = void 0;
const express_1 = __importDefault(require("express"));
exports.express = express_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
exports.dotenv = dotenv_1.default;
const pg_1 = require("pg");
Object.defineProperty(exports, "Pool", { enumerable: true, get: function () { return pg_1.Pool; } });
const cors_1 = __importDefault(require("cors"));
exports.cors = cors_1.default;
const body_parser_1 = __importDefault(require("body-parser"));
exports.bodyParser = body_parser_1.default;
const routing_1 = require("./routs/routing");
Object.defineProperty(exports, "casinoRoutes", { enumerable: true, get: function () { return routing_1.casinoRoutes; } });
Object.defineProperty(exports, "countriesRoutes", { enumerable: true, get: function () { return routing_1.countriesRoutes; } });
Object.defineProperty(exports, "countryCodesRoutes", { enumerable: true, get: function () { return routing_1.countryCodesRoutes; } });
Object.defineProperty(exports, "featureRoutes", { enumerable: true, get: function () { return routing_1.featureRoutes; } });
Object.defineProperty(exports, "bonusRoutes", { enumerable: true, get: function () { return routing_1.bonusRoutes; } });
Object.defineProperty(exports, "userRoutes", { enumerable: true, get: function () { return routing_1.userRoutes; } });
Object.defineProperty(exports, "paymentsRoutes", { enumerable: true, get: function () { return routing_1.paymentsRoutes; } });
dotenv_1.default.config();
/* const poolAdmin = new Pool({
  user: "postgres",
  port: 5432,
  password: "10032018",
  host: "localhost",
  database: "table",
});
const poolUser = new Pool({
  user: "test_user",
  port: 5432,
  password: "123456",
  host: "localhost",
  database: "table",
});
 */
const poolAdmin = new pg_1.Pool({
    user: "u3fskdhqbnusg",
    port: 5432,
    password: "51;fbluf]$4i",
    host: "35.214.217.124",
    database: "dbszp07q4leigl",
});
const poolUser = new pg_1.Pool({
    user: "u3fskdhqbnusg",
    port: 5432,
    password: "51;fbluf]$4i",
    host: "35.214.217.124",
    database: "dbszp07q4leigl",
});
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 4000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/casinos", (0, routing_1.casinoRoutes)(poolAdmin, poolUser));
app.use("/countries", (0, routing_1.countriesRoutes)(poolAdmin, poolUser));
app.use("/country-codes", (0, routing_1.countryCodesRoutes)(poolAdmin, poolUser));
app.use("/features", (0, routing_1.featureRoutes)(poolAdmin, poolUser));
app.use("/bonuses", (0, routing_1.bonusRoutes)(poolAdmin, poolUser));
app.use("/users", (0, routing_1.userRoutes)(poolAdmin, poolUser));
app.use("/payments", (0, routing_1.paymentsRoutes)(poolAdmin, poolUser));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
