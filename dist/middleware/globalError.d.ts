import type { NextFunction, Request, Response } from "express";
export declare const globalError: (err: any, req: Request, res: Response, next: NextFunction) => void;
