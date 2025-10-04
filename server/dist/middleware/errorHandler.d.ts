import { Request, Response, NextFunction } from 'express';
export interface IAppError extends Error {
    statusCode: number;
    isOperational: boolean;
    code?: string;
}
export declare class AppError extends Error implements IAppError {
    statusCode: number;
    isOperational: boolean;
    code?: string;
    constructor(message: string, statusCode: number, code?: string);
}
export declare const errorHandler: (error: Error | IAppError, req: Request, res: Response, next: NextFunction) => void;
export declare const asyncHandler: (fn: Function) => (req: Request, res: Response, next: NextFunction) => void;
export declare const notFound: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map