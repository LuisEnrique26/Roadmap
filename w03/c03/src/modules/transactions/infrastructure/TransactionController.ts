import type TransactionService from "../application/TransactionService.js";
import type { Transaction } from "./TransactionRepository.js";
import { createTransactionSchema } from "../domain/schema.js";
import type { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { Prisma } from "@prisma/client";

class TransactionController {
    constructor(private transactionService: TransactionService) {}

    public async handleCreate(req: Request, res: Response): Promise<void> {
        try {
            const validateData = createTransactionSchema.parse(req.body);
            const inspectorId = req.user?.id;
            if (!inspectorId) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }
            const newTransaction: Transaction = {
                id: randomUUID(),
                amount: validateData.amount,
                currency: validateData.currency,
                description: validateData.description || "Without description",
                userId: inspectorId
            }
            await this.transactionService.createTransaction(newTransaction);
            res.status(201).json({ success: true, data: newTransaction });
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientValidationError) {
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(400).json({ error: error.message });
        }
    }

    public async handleGetPaginated(req: Request, res: Response): Promise<Transaction[] | null> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;
            if(page <= 0 || pageSize <= 0) {
                throw new Error("Page and pageSize must be greater than 0");
            }
            const data = await this.transactionService.getPaginated(page, pageSize);
            res.status(200).json({
                succes: true,
                data: data,
                meta: {
                    page,
                    pageSize,
                    total: await this.transactionService.getTransactionsLength()
                }
            });
            return data;
        } catch (error: any) {
            res.status(400).json({ error: error.message });
            return null;
        }
    }

    public async handleGetAll(req: Request, res: Response): Promise<void> {
        try {
            const transactions = await this.transactionService.getTransactions();
            if(!transactions) {
                throw new Error("Transactions not found");
            }
            res.status(200).json({ success: true, data: transactions });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async handleGetById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id?.toString();
            if(!id) {
                throw new Error("Id is required");
            }
            const transaction = await this.transactionService.getTransactionById(id);
            res.status(200).json({ success: true, data: transaction });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default TransactionController;