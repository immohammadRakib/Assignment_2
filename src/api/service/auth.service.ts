import bcrypt from "bcrypt";
import type { User } from "../../types";
import { pool } from "../../db";

class AuthService {
  async createUser(userData: Partial<User>) {
    const { name, email, password, role } = userData;
    
    const hash = await bcrypt.hash(password!, 10);
    const userRole = role || "contributor";

    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role, created_at, updated_at
    `;
    
    const res = await pool.query(query, [name, email, hash, userRole]);
    return res.rows[0];
  }

  async getUserByEmail(email: string) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const res = await pool.query(query, [email]);
    return res.rows[0];
  }
}

export default new AuthService();
