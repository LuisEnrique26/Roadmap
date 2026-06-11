import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "./index.js";

describe("MovementApi Integration Test", () => {
    it("should return 201 and the movement", async () => {
        // Arrange
        const payload = {
            productName: "Product 1",
            qty: 10,
            type: "In"
        };
        // Act
        const response = await request(app).post("/api/v1/movimientos").send(payload);
        // Assert
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.productName).toBe(payload.productName);
        expect(response.body.data.qty).toBe(payload.qty);
        expect(response.body.data.type).toBe(payload.type);
    });

    it("should return 400 and an error message", async () => {
        // Arrange
        const invalidPayload = {
            productName: "Product 1",
            qty: -10,
            type: "In"
        };
        // Act
        const response = await request(app).post("/api/v1/movimientos").send(invalidPayload);
        // Assert
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("La cantidad debe ser un número entero positivo");
    });

    it("should return 400 and an error message", async () => {
        // Arrange
        const invalidPayload = {
            productName: "Product 1",
            qty: 10,
        };
        // Act
        const response = await request(app).post("/api/v1/movimientos").send(invalidPayload);
        // Assert
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("El tipo debe ser 'In' o 'Out'");
    });
});