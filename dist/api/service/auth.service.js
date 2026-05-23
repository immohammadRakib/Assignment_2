"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../db");
class AuthService {
    async createUser(userData) {
        const { name, email, password, role } = userData;
        const hash = await bcryptjs_1.default.hash(password, 10);
        const userRole = role || "contributor";
        const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role, created_at, updated_at
    `;
        const res = await db_1.pool.query(query, [name, email, hash, userRole]);
        return res.rows[0];
    }
    async getUserByEmail(email) {
        const query = `SELECT * FROM users WHERE email = $1`;
        const res = await db_1.pool.query(query, [email]);
        return res.rows[0];
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map