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
exports.loginUserController = void 0;
const i = __importStar(require("../imports"));
const loginUserController = async (pool, req, res) => {
    const { email, password } = req.body;
    if (!i.emailValidator(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    else if (!i.passwordValidator(password)) {
        return res.status(400).json({
            message: "Invalid password format (min. length 6, special symbols, a-zA-Z0-9)",
        });
    }
    console.log("---------login user start request---------");
    try {
        // User checking in DB
        const userQuery = await pool.query(`SELECT id, email, password FROM users WHERE email=$1`, [email]);
        if (userQuery.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = userQuery.rows[0];
        // Password checking
        const isPasswordValid = await i.bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        //  JWT generation
        const token = i.jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "default_secret", // Используйте переменную окружения для секретного ключа
        { expiresIn: "1h" });
        console.log("---------login user end request---------");
        return res.status(200).json({
            message: "Login successful",
            token,
        });
    }
    catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({
                error: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    }
};
exports.loginUserController = loginUserController;
