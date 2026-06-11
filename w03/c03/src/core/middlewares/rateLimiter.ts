import type { NextFunction, Request, Response } from "express";

const rateLimiterWindow = 60 * 1000;
const maxRequests = 5;
const requestStore = new Map();

const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const now = Date.now();

    if(!requestStore.has(ip)) {
        requestStore.set(ip, { count: 1, resetTime: now + rateLimiterWindow });
    }

    const clientData = requestStore.get(ip);

    if(now > clientData.resetTime) {
        clientData.count = 1;
        clientData.resetTime = now + rateLimiterWindow;
        return next();
    }

    if(clientData.count >= maxRequests) {
        return res.status(429).json({
            error: "Rate limit exceeded",
            message: "Please, try again later"
        });
    }

    clientData.count++;
    return next();
};

export default rateLimiter;