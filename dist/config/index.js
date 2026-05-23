"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = require("process");
dotenv_1.default.config({ quiet: true });
const config = {
    port: (process_1.env.PORT || "8080"),
    database_url: process_1.env.DATABASE_URL,
    node_env: (process_1.env.NODE_ENV || "development"),
    jwt_secret: (process_1.env.JWT_SECRET || "super_secret_devpulse_key_123")
};
exports.default = config;
//# sourceMappingURL=index.js.map