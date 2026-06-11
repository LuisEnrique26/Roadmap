
export interface Movement {
    productName: string;
    qty: number;
    type: "In" | "Out";
}

class MovementRepository {
    private readonly movements: Movement[] = [];

    public add(movement: Movement): void {
        this.movements.push(movement);
    }

    public getMovements(): Movement[] {
        return this.movements;
    }

    public getMovementLength(): number {
        return this.movements.length;
    }

    public getPaginated(page: number, pageSize: number): Movement[] {
        return this.movements.slice((page - 1) * pageSize, page * pageSize);
    }    
}

export default MovementRepository;