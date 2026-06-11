import { describe, expect, it, beforeEach } from "vitest";
import MovementService from "./MovementService.js";
import MovementRepository from "./MovementRepository.js";

describe("MovementService Unit Test", () => {
    let service: MovementService;
    let repository: MovementRepository;

    beforeEach(() => {
        repository = new MovementRepository();
        service = new MovementService(repository);
    });

    it("should create a movement and return it", () => {
        const movement = service.createMovement("Product 1", 10, "In");
        expect(movement).toBeDefined();
        expect(movement.productName).toBe("Product 1");
        expect(movement.qty).toBe(10);
        expect(movement.type).toBe("In");
    });

    it("should return the number of movements", () => {
        const movement1 = service.createMovement("Product 1", 10, "In");
        const movement2 = service.createMovement("Product 2", 5, "Out");
        const movement3 = service.createMovement("Product 3", 15, "In");
        expect(service.getMovementLength()).toBe(3);
    });

    it("should return an error if the qty is negative", () => {
        expect(() => service.createMovement("Product 1", -10, "In")).toThrow("La cantidad debe ser mayor a 0");
    });
});