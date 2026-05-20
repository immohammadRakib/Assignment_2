// import { neon } from "@neondatabase/serverless";
// import config from "../config";




// export const sql = neon(config.database_url)

// export const initDB = async () => {
     
//     await sql`
//        CREATE TABLE IF NOT EXISTS users (
//           id SERIAL PRIMARY KEY,
//           name VARCHAR(50) NOT NULL,
//           email VARCHAR(70) NOT NULL UNIQUE,
//           password_hash TEXT NOT NULL,
//           age INT NOT NULL,
//           role VARCHAR(20) NOT NULL DEFAULT 'user',
//           created_at TIMESTAMP NOT NULL DEFAULT NOW(),
//           updated_at TIMESTAMP NOT NULL DEFAULT NOW()
//        )
//     `

//     await sql`
//        CREATE TABLE IF NOT EXISTS orders (
//           id SERIAL PRIMARY KEY,
//           customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//           quantity INT NOT NULL CHECK(quantity > 0),
//           food TEXT NOT NULL, 
//           price NUMERIC(10, 2) NOT NULL,
//           created_at TIMESTAMP NOT NULL DEFAULT NOW(),
//           updated_at TIMESTAMP NOT NULL DEFAULT NOW()
//        )
//     `    


//     console.log('database connected')
// }




import { Pool } from "pg";
import config from "../config";

// নেটিভ pg পুল কনফিগারেশন
export const pool = new Pool({
  connectionString: config.database_url,
});

export const initDB = async () => {
  try {
    // ১. Users টেবিল (অ্যাসাইনমেন্ট অনুযায়ী)
    await pool.query(`
       CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(150) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(20) NOT NULL DEFAULT 'contributor' CHECK (role IN ('contributor', 'maintainer')),
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
       );
    `);

    // ২. Issues টেবিল (অ্যাসাইনমেন্ট অনুযায়ী - কোনো FOREIGN KEY constraint ছাড়া, অ্যাপ লজিকে ভ্যালিডেশন হবে)
    await pool.query(`
       CREATE TABLE IF NOT EXISTS issues (
          id SERIAL PRIMARY KEY,
          title VARCHAR(150) NOT NULL,
          description TEXT NOT NULL,
          type VARCHAR(20) NOT NULL CHECK (type IN ('bug', 'feature_request')),
          status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
          reporter_id INT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
       );
    `);

    console.log("Database connected & tables verified 🐘");
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
};


