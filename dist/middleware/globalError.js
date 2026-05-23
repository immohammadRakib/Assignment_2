"use strict";
// import type { NextFunction, Request, Response } from "express";
// import config from "../config";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const config_1 = __importDefault(require("../config"));
const globalError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Doesn't Work",
        stack: config_1.default.node_env === "development" ? err.stack : undefined
    });
};
exports.globalError = globalError;
//# sourceMappingURL=globalError.js.map