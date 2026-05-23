import config from "../config";
export const globalError = (err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : "Internal Server Doesn't Work",
        stack: config.node_env === "developement" && err instanceof Error ? err.stack : undefined
    });
    next();
};
//# sourceMappingURL=globalError.js.map