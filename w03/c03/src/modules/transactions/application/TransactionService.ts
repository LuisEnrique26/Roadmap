import type { Transaction } from './../infrastructure/TransactionRepository.js';
import type TransactionRepository from "../infrastructure/TransactionRepository.js";

class TransactionService {
    constructor(private transactionRepository: TransactionRepository) {}

    public async createTransaction(transaction: Transaction): Promise<Transaction> {
        if (transaction.amount <= 0) {
            throw new Error("Amount must be greater than 0");
        }
        if (transaction.currency.length !== 3) {
            throw new Error("Currency code must be 3 characters long");
        }
        if (transaction.description && transaction.description.length > 100) {
            throw new Error("Description must be at most 100 characters long");
        }
        await this.transactionRepository.add(transaction);
        return transaction;
    }

    public async getTransactionById(id: string): Promise<Transaction | null> {
        return  await this.transactionRepository.getById(id);
    }

    public async getTransactions(): Promise<Transaction[]> {
        return await this.transactionRepository.getTransactions();
    }

    public async getTransactionsLength(): Promise<number> {
        return await this.transactionRepository.getTransactionsLength();
    }

    public async getPaginated(page: number, pageSize: number): Promise<Transaction[]> {
        return await this.transactionRepository.getPaginated(page, pageSize);
    }
}

export default TransactionService;