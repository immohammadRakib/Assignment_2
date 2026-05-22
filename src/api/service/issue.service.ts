import { pool } from "../../db";
import type { Issue } from "../../types";

class IssueService {

  async createIssue(issueData: Partial<Issue>) {
    const { title, description, type, reporter_id } = issueData;
    
    const query = `
      INSERT INTO issues (title, description, type, reporter_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const res = await pool.query(query, [title, description, type, reporter_id]);
    return res.rows[0];
  }

  
  async getAllIssues(filters: { sort?: string; type?: string; status?: string }) {
    let query = `SELECT * FROM issues WHERE 1=1`;
    const queryParams: any[] = [];
    let paramIndex = 1;

  
    if (filters.type) {
      query += ` AND type = $${paramIndex}`;
      queryParams.push(filters.type);
      paramIndex++;
    }
    if (filters.status) {
      query += ` AND status = $${paramIndex}`;
      queryParams.push(filters.status);
      paramIndex++;
    }

    
    if (filters.sort === "oldest") {
      query += ` ORDER BY created_at ASC`;
    } else {
      query += ` ORDER BY created_at DESC`; 
    }

    const issueRes = await pool.query(query, queryParams);
    const issues = issueRes.rows;

    if (issues.length === 0) return [];

   
    const reporterIds = [...new Set(issues.map((i) => i.reporter_id))];

    
    const userQuery = `SELECT id, name, role FROM users WHERE id = ANY($1)`;
    const userRes = await pool.query(userQuery, [reporterIds]);
    
   
    const userMap = userRes.rows.reduce((map: any, user: any) => {
      map[user.id] = user;
      return map;
    }, {});

   
    return issues.map((issue) => {
      const { reporter_id, ...issueData } = issue;
      return {
        ...issueData,
        reporter: userMap[reporter_id] || null
      };
    });
  }


  async getIssueById(id: number) {
    const issueRes = await pool.query(`SELECT * FROM issues WHERE id = $1`, [id]);
    const issue = issueRes.rows[0];
    if (!issue) return null;

    const userRes = await pool.query(`SELECT id, name, role FROM users WHERE id = $1`, [issue.reporter_id]);
    const { reporter_id, ...issueData } = issue;
    
    return {
      ...issueData,
      reporter: userRes.rows[0] || null
    };
  }


  async updateIssue(id: number, updateData: Partial<Issue>) {
    const { title, description, type, status } = updateData;
    const query = `
      UPDATE issues 
      SET title = COALESCE($1, title), 
          description = COALESCE($2, description), 
          type = COALESCE($3, type), 
          status = COALESCE($4, status),
          updated_at = NOW()
      WHERE id = $5
      RETURNING *
    `;
    // const res = await pool.query(query, [title, description, type, status, id]);
    const res = await pool.query(query, [
      title !== undefined ? title : null,
      description !== undefined ? description : null,
      type !== undefined ? type : null,
      status !== undefined ? status : null,
      id
    ]);
    return res.rows[0];
  }


  async deleteIssue(id: number) {
    const res = await pool.query(`DELETE FROM issues WHERE id = $1 RETURNING id`, [id]);
    return res.rowCount && res.rowCount > 0;
  }
}

export default new IssueService();
