import type { NextFunction, Request, Response } from "express";
export declare const globalError: (err: unknown, req: Request, res: Response, next: NextFunction) => void;
