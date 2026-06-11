import type TransactionService from "../application/TransactionService.js";
import type { Transaction } from "./TransactionRepository.js";
import { type CreateTransactionSchema, createTransactionSchema } from "../domain/schema.js";
import type { Request, Response } from "express";
import z from "zod";

class TransactionController {
    constructor(private transactionService: TransactionService) {}

    public handleCreate(req: Request, res: Response): void {
        try {
            const validateData = createTransactionSchema.parse(req.body);
            const newTransaction: Transaction = {
                id: Date.now().toString(),
                amount: validateData.amount,
                currency: validateData.currency,
                description: validateData.description || "Without description"
            }
            this.transactionService.createTransaction(newTransaction);
            res.status(201).json({ success: true, data: newTransaction });
            return;
        } catch (error: any) {

            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.issues[0]?.message ?? "Validation error" });
                return;
            }
            res.status(400).json({ error: error.message });}

    }

    public handleGetPaginated(req: Request, res: Response): Transaction[] | null {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;
            if(page <= 0 || pageSize <= 0) {
                throw new Error("Page and pageSize must be greater than 0");
            }
            const data = this.transactionService.getPaginated(page, pageSize);
            res.status(200).json({
                succes: true,
                data: data,
                meta: {
                    page,
                    pageSize,
                    total: this.transactionService.getTransactionsLength()
                }
            });
            return data;
        } catch (error: any) {
            res.status(400).json({ error: error.message });
            return null;
        }
    }

    public handleGetAll(req: Request, res: Response): void {
        try {
            const transactions = this.transactionService.getTransactions();
            if(!transactions) {
                throw new Error("Transactions not found");
            }
            res.status(200).json({ success: true, data: transactions });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public handleGetById(req: Request, res: Response): void {
        try {
            const id = req.params.id?.toString();
            if(!id) {
                throw new Error("Id is required");
            }
            const transaction = this.transactionService.getTransactionById(id);
            res.status(200).json({ success: true, data: transaction });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default TransactionController;