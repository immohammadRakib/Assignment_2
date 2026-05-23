"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const auth_service_1 = __importDefault(require("../service/auth.service"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const signUp = async (req, res) => {
    try {
        const user = await auth_service_1.default.createUser(req.body);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Registration failed",
            errors: error.message
        });
    }
};
exports.signUp = signUp;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await auth_service_1.default.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, role: user.role }, config_1.default.jwt_secret || "secret", { expiresIn: "1d" });
        delete user.password;
        // Standard Success Response (200 OK)
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token,
                user
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login failed",
            errors: error.message
        });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map