import { describe, expect, it, beforeEach } from "vitest";
import TransactionService from "../src/modules/transactions/application/TransactionService.js";
import TransactionRepository from "../src/modules/transactions/infrastructure/TransactionRepository.js";
describe("TransactionService Unit Test", () => {
    let transactionService;
    let transactionRepository;
    beforeEach(() => {
        transactionRepository = new TransactionRepository();
        transactionService = new TransactionService(transactionRepository);
    });
    it("should create a transaction and return it", async () => {
        const transaction = {
            id: "1",
            amount: 100,
            currency: "USD",
            description: "Test transaction",
        };
        const transactionResponse = transactionService.createTransaction(transaction);
        expect(transactionResponse).toEqual({
            id: expect.any(String),
            amount: 100,
            currency: "USD",
            description: "Test transaction",
        });
    });
    it("should validate the amount", async () => {
        const transaction = {
            id: "1",
            amount: -100,
            currency: "USD",
            description: "Test transaction",
        };
        expect(() => transactionService.createTransaction(transaction)).toThrow("Amount must be greater than 0");
    });
    it("should validate the currency code", async () => {
        const transaction = {
            id: "1",
            amount: 100,
            currency: "US",
            description: "Test transaction",
        };
        expect(() => transactionService.createTransaction(transaction)).toThrow("Currency code must be 3 characters long");
    });
    it("should return the length of the transactions", async () => {
        transactionService.createTransaction({ id: "1", amount: 100, currency: "USD", description: "Test transaction" });
        transactionService.createTransaction({ id: "2", amount: 100, currency: "USD", description: "Test transaction" });
        transactionService.createTransaction({ id: "3", amount: 100, currency: "USD", description: "Test transaction" });
        expect(transactionService.getTransactionsLength()).toBe(3);
    });
});
//# sourceMappingURL=transaction.test.js.map