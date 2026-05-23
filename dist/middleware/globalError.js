"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const config_1 = __importDefault(require("../config"));
const globalError = (err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : "Internal Server Doesn't Work",
        stack: config_1.default.node_env === "development" && err instanceof Error ? err.stack : undefined
    });
    next();
};
exports.globalError = globalError;
//# sourceMappingURL=globalError.js.map