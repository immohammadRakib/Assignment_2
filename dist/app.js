"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./middleware/logger");
const globalError_1 = require("./middleware/globalError");
const router_1 = __importDefault(require("./api/router"));
const app = (0, express_1.default)();
// Global Middlewares
app.use(express_1.default.json());
app.use(logger_1.logger);
// Base API Route Setup
app.use("/api", router_1.default);
app.get('/', (req, res) => {
    res.send("Hello World");
});
// Global Error Handler
app.use(globalError_1.globalError);
exports.default = app;
//# sourceMappingURL=app.js.map