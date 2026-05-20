import dotenv from "dotenv";
import { env } from "process";

dotenv.config({ quiet: true });

const config = {
    port: (env.PORT || "8080") as string,
    database_url: env.DATABASE_URL as string,
    node_env: (env.NODE_ENV || "development") as string,
    jwt_secret: (env.JWT_SECRET || "super_secret_devpulse_key_123") as string 
};

export default config;
