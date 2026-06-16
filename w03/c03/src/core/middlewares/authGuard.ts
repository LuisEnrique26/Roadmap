import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string
            };
        }
    }
}

const authGuard = (req: Request,res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const secret = process.env.JWT_SECRET || "default_secret";
        const decoded = jwt.verify(token, secret) as unknown;
        if (typeof decoded === 'object' && decoded !== null) {
            const { id, role } = decoded as { id: string; role: string };
            req.user = { id, role };
            next();
        } else {
            return res.status(403).json({ error: "Forbidden access" });
        }
    } catch (error) {
        return res.status(403).json({ error: "Forbidden access" });
    }
};

export default authGuard;