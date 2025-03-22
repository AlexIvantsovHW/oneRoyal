"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRoutes = exports.userRoutes = exports.bonusRoutes = exports.featureRoutes = exports.countryCodesRoutes = exports.countriesRoutes = exports.casinoRoutes = void 0;
const i = __importStar(require("./imports"));
//CASINO
const casinoRoutes = (poolAdmin, poolUser) => {
    const router = i.Router();
    router.get("/", (req, res) => i.getAllCasinosController(poolUser, req, res));
    router.get("/country_code/:country_code", async (req, res) => {
        await i.getAllCasinosByCountryCodeController(poolUser, req, res);
    });
    router.put("/rating/:country_code_id", (req, res) => i.switchCasinosRateController(poolAdmin, req, res));
    router.delete("/:id", (req, res) => i.deleteCasinoController(poolAdmin, req, res));
    router.put("/:id", (req, res) => i.updateCasinoController(poolAdmin, req, res));
    router.post("/create", (req, res) => i.createCasinoController(poolAdmin, req, res));
    router.get("/website/country_code/:country_code", async (req, res) => {
        await i.getAllCasinosByCountryCodeWebsiiteController(poolUser, req, res);
    });
    return router;
};
exports.casinoRoutes = casinoRoutes;
//COUNTRIES
const countriesRoutes = (poolAdmin, poolUser) => {
    const router = i.Router();
    router.get("/", (req, res) => i.getAllCountriesController(poolUser, req, res));
    router.get("/country/:country_code", async (req, res) => {
        await i.getCountryByCountryCodeController(poolUser, req, res);
    });
    return router;
};
exports.countriesRoutes = countriesRoutes;
//COUNTRY CODES
const countryCodesRoutes = (poolAdmin, poolUser) => {
    const router = i.Router();
    router.get("/", (req, res) => i.getAllCountryCodesController(poolUser, req, res));
    router.get("/country", async (req, res) => {
        await i.getCountryCodeByCountryIdController(poolUser, req, res);
    });
    router.get("/country-id/:country_id", async (req, res) => {
        await i.getCountryCodesByCountryIdController(poolUser, req, res);
    });
    router.post("/create", async (req, res) => {
        await i.createCountryCodeController(poolAdmin, req, res);
    });
    return router;
};
exports.countryCodesRoutes = countryCodesRoutes;
//FEATURES
const featureRoutes = (poolAdmin, poolUser) => {
    const router = i.Router();
    router.get("/", (req, res) => i.getAllFeatuesController(poolUser, req, res));
    router.post("/create", async (req, res) => {
        await i.createFeatureController(poolAdmin, req, res);
    });
    return router;
};
exports.featureRoutes = featureRoutes;
//BONUSES
const bonusRoutes = (poolAdmin, poolUser) => {
    const router = i.Router();
    router.get("/", (req, res) => i.getAllBonusesController(poolUser, req, res));
    return router;
};
exports.bonusRoutes = bonusRoutes;
// USERS
const userRoutes = (poolAdmin, poolUser) => {
    const router = i.Router();
    router.get("/", (req, res) => i.getAllUsersController(poolAdmin, req, res));
    router.post("/create", async (req, res) => {
        await i.createUserController(poolAdmin, req, res);
    });
    router.post("/login", async (req, res) => {
        await i.loginUserController(poolAdmin, req, res);
    });
    return router;
};
exports.userRoutes = userRoutes;
// PAYMENTS
const paymentsRoutes = (poolAdmin, poolUser) => {
    const router = i.Router();
    router.get("/", (req, res) => i.getAllPaymentsController(poolUser, req, res));
    return router;
};
exports.paymentsRoutes = paymentsRoutes;
