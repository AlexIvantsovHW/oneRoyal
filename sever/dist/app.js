"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.AppModule = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_module_1 = require("./modules/users/users.module");
const database_1 = require("./config/database");
class AppModule {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.setupMiddleware();
        this.setupModules();
        this.connectDatabase();
    }
    setupMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    setupModules() {
        const usersModule = new users_module_1.UsersModule();
        this.app.use("/users", usersModule.router);
    }
    async connectDatabase() {
        await (0, database_1.connectDB)();
    }
}
exports.AppModule = AppModule;
exports.app = new AppModule().app;
