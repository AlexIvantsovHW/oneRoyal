"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const database_1 = require("../../config/database");
const user_entity_1 = require("../../modules/users/entities/user.entity");
class UsersService {
    userRepository;
    constructor() {
        this.userRepository = database_1.AppDataSource.getRepository(user_entity_1.User);
    }
    async findAll() {
        console.log("Calling findAll...");
        try {
            const users = await this.userRepository.find();
            console.log("Users found:", users);
            return users;
        }
        catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }
    async findById(id) {
        return await this.userRepository.findOne({ where: { id } });
    }
    async createUser(email, username, password) {
        const user = this.userRepository.create({ email, username, password });
        return await this.userRepository.save(user);
    }
}
exports.UsersService = UsersService;
