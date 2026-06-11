import type { NextFunction, Request, Response } from "express";

const authGuard = (req: Request,res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ") ?? [];
    if (token.length !== 2 || token[0] !== "Bearer" || token[1] !== "admin-secret-token") {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};

export default authGuard;