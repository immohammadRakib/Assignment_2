"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictToMaintainer = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Protected endpoint reject requests without a valid JWT"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        req.user = {
            id: decoded.id,
            name: decoded.name,
            role: decoded.role
        };
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            errors: error.message
        });
    }
};
exports.protect = protect;
const restrictToMaintainer = (req, res, next) => {
    if (req.user && req.user.role !== "maintainer") {
        return res.status(403).json({
            success: false,
            message: "Role verification occurs before privileged operations. Access denied."
        });
    }
    next();
};
exports.restrictToMaintainer = restrictToMaintainer;
//# sourceMappingURL=auth.middleware.js.map