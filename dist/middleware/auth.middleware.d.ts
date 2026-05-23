import type { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                name: string;
                role: "contributor" | "maintainer";
            };
        }
    }
}
export declare const protect: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const restrictToMaintainer: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
