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
exports.createUserController = void 0;
const i = __importStar(require("../imports"));
const createUserController = async (pool, req, res) => {
    const { email, password, user_name } = req.body;
    if (!i.emailValidator(email)) {
        return res
            .status(404)
            .json({ message: "email is empty or it includes wrong format" });
    }
    else if (!i.passwordValidator(password)) {
        return res.status(404).json({
            message: "password is empty or it includes wrong format (min. lenght 6 simbols, special symbols,a-zA-Z0-9 letters)",
        });
    }
    else if (!i.usernameValidator(user_name)) {
        return res.status(404).json({
            message: " Username is empty or it includes wrong format (min. lenght 3 symbols) ",
        });
    }
    console.log("---------create a new user start request---------");
    try {
        // check existing username
        const userQuery = await pool.query(`
    SELECT user_name FROM users WHERE user_name='${user_name}'
    `);
        if (userQuery.rowCount > 0) {
            return res.status(200).send({
                message: `${user_name} is already exist! please choose another one name!`,
            });
        }
        // check existing email
        const emailQuery = await pool.query(`
      SELECT email FROM users WHERE email='${email}'
      `);
        if (emailQuery.rowCount > 0) {
            return res.status(200).send({
                message: `${email} is already exist! please choose another one name!`,
            });
        }
        // password bcrypts
        const passwordQuery = await pool.query(`SELECT password FROM users`);
        const passwords = passwordQuery.rows.map((row) => row.password);
        for (const existingPassword of passwords) {
            const isMatch = await i.bcrypt.compare(password, existingPassword);
            if (isMatch) {
                return res.status(409).send({
                    message: " Please choose a different password.",
                });
            }
        }
        const saltRounds = 10;
        const hashedPassword = await i.bcrypt.hash(password, saltRounds);
        await pool.query("BEGIN");
        const createUserQuery = await pool.query(`INSERT INTO users (email, password, user_name,role) VALUES ($1, $2, $3,false) RETURNING id`, [email, hashedPassword, user_name]);
        const result = createUserQuery.rows[0];
        if (!result) {
            console.log("User creation failed.");
            return res.status(500).json({
                message: "User was not created correctly. Please try again.",
            });
        }
        await pool.query("COMMIT");
        console.log("---------create a new user  end request---------");
        return res
            .status(201)
            .json({
            status: 201,
            message: `User with name ${user_name} is created successfully! user id is ${result.id}`,
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
exports.createUserController = createUserController;
