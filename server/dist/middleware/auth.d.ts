import { Request, Response, NextFunction } from 'express';
import { IAuthToken } from '../types';
declare global {
    namespace Express {
        interface Request {
            user?: IAuthToken;
        }
    }
}
export declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const requireRole: (roles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
export declare const optionalAuth: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map