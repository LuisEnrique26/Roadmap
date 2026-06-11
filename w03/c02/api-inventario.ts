import express, { type Request, type Response, type NextFunction } from "express";

const app = express();

app.use(express.json());

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
};

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization !== "Bearer") {
        next();
    } else {
        next(new Error("Unauthorized"));
    }
};

app.use(logger);
app.use(requireAuth);

app.get("/api/movimientos", (req: Request, res: Response) => {
    res.json({
        data: [
            { id: 1, name: "Producto 1", qty: 10, type: "In" },
            { id: 2, name: "Producto 2", qty: 5, type: "Out" },
            { id: 3, name: "Producto 3", qty: 15, type: "In" },
        ],
    });
});

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(500).json({ error: err.message });
};

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});