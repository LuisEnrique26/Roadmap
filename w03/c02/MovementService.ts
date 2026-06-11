import type MovementRepository from "./MovementRepository.js";
import type { Movement } from "./MovementRepository.js";

class MovementService {
    constructor(private movementRepository: MovementRepository) {}
    public createMovement(productName: string, qty: number, type: "In" | "Out"): Movement {
        if (qty <= 0) {
            throw new Error("La cantidad debe ser mayor a 0");
        }

        const movement: Movement = {
            productName,
            qty,
            type
        }
        this.movementRepository.add(movement);
        return movement;
    }

    public getMovementLength(): number {
        return this.movementRepository.getMovementLength();
    }

    public getPaginated(page: number, pageSize: number): Movement[] {
        return this.movementRepository.getPaginated(page, pageSize);
    }
}

export default MovementService;