import dotenv from "dotenv";
import { env } from "process";
dotenv.config({ quiet: true });
const config = {
    port: (env.PORT || "8080"),
    database_url: env.DATABASE_URL,
    node_env: (env.NODE_ENV || "development"),
    jwt_secret: (env.JWT_SECRET || "super_secret_devpulse_key_123")
};
export default config;
//# sourceMappingURL=index.js.map