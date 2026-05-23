// import type { NextFunction, Request, Response } from "express";
// import config from "../config";


// export const globalError = (err: unknown, req: Request, res: Response, next: NextFunction) => {
//     res.status(500).json({
//         success: false,
//         message: err instanceof Error ? err.message : "Internal Server Doesn't Work",
//         stack: config.node_env === "development" && err instanceof Error ? err.stack : undefined
//     })

//     next();
// }


import type { NextFunction, Request, Response } from "express";
import config from "../config";

export const globalError = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Doesn't Work",
        stack: config.node_env === "development" ? err.stack : undefined
    });
};
