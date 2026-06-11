import type { Request, Response } from "express";
import type MovementService from "./MovementService.js";
import { z } from "zod";

const createMovementSchema = z.object({
    productName: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(50, "El nombre debe tener como máximo 50 caracteres"),
    qty: z.number().int().positive("La cantidad debe ser un número entero positivo"),
    type: z.enum(["In", "Out"], { error: "El tipo debe ser 'In' o 'Out'" })
});

class MovementController {
    constructor(private movementService: MovementService) {}

    public handleCreate(req: Request, res: Response): void {
        try {
            const { productName, qty, type } = createMovementSchema.parse(req.body);
            const movement = this.movementService.createMovement(productName, qty, type);
            res.status(201).json({ success: true, data: movement });
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.issues[0]?.message ?? "Error de validación" });
                return;
            }
            res.status(400).json({ error: error.message });
        }
    }

    public handleGetPaginated(req: Request, res: Response): void {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const movements = this.movementService.getPaginated(page, pageSize);
        res.json({
            success: true,
            data: movements,
            meta: {
                page,
                pageSize,
                total: this.movementService.getMovementLength()
            }
        });
    }
}

export default MovementController;