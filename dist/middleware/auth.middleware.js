import jwt from "jsonwebtoken";
import config from "../config";
export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Protected endpoint reject requests without a valid JWT"
            });
        }
        const decoded = jwt.verify(token, config.jwt_secret);
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
export const restrictToMaintainer = (req, res, next) => {
    if (req.user && req.user.role !== "maintainer") {
        return res.status(403).json({
            success: false,
            message: "Role verification occurs before privileged operations. Access denied."
        });
    }
    next();
};
//# sourceMappingURL=auth.middleware.js.map