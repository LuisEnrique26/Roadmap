import { describe, expect, it } from "vitest";
import { app } from "../index.js";
import request from "supertest";
describe("TransactionApi Integration Test", () => {
    it("should return 201 and the transaction", async () => {
        // Arrange
        const payload = {
            amount: 100,
            currency: "USD"
        };
        // Act
        const response = await request(app).post("/api/v1/transactions")
            .set({
            "Content-Type": "application/json",
            "Authorization": "Bearer admin-secret-token"
        })
            .send(payload);
        // Assert
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.amount).toBe(payload.amount);
        expect(response.body.data.currency).toBe(payload.currency);
        expect(response.body.data.description).toBe("Without description");
    });
    it("should return 400 and an error message", async () => {
        // Arrange
        const invalidPayload = {
            amount: -100,
            currency: "USD"
        };
        // Act
        const response = await request(app).post("/api/v1/transactions")
            .set({
            "Content-Type": "application/json",
            "Authorization": "Bearer admin-secret-token"
        })
            .send(invalidPayload);
        // Assert
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Amount should be a positive number");
    });
    it("should return 400 and an error message", async () => {
        // Arrange
        const invalidPayload = {
            amount: 100,
            currency: "US"
        };
        // Act
        const response = await request(app).post("/api/v1/transactions")
            .set({
            "Content-Type": "application/json",
            "Authorization": "Bearer admin-secret-token"
        })
            .send(invalidPayload);
        // Assert
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Currency code should be 3 characters long");
    });
    it("should return a 401 and a error message", async () => {
        // Arrange
        const invalidPayload = {
            amount: 100,
            currency: "USD",
            description: "A very long description"
        };
        // Act
        const response = await request(app).post("/api/v1/transactions").send(invalidPayload);
        // Assert
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Unauthorized");
    });
});
//# sourceMappingURL=transactions.test.js.map