"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const express_1 = require("express");
const user_controller_1 = require("../../controllers/users/user.controller");
const user_service_1 = require("../../service/user/user.service");
class UsersModule {
    router;
    usersController;
    constructor() {
        const usersService = new user_service_1.UsersService();
        this.usersController = new user_controller_1.UsersController(usersService);
        this.router = this.setupRoutes();
    }
    setupRoutes() {
        const router = (0, express_1.Router)();
        router.get("/", this.usersController.getAllUsers.bind(this.usersController));
        router.get("/:id", this.usersController.getUserById.bind(this.usersController));
        router.post("/", this.usersController.createUser.bind(this.usersController));
        return router;
    }
}
exports.UsersModule = UsersModule;
