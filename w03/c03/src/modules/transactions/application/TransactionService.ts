import type { Transaction } from './../infrastructure/TransactionRepository.js';
import type TransactionRepository from "../infrastructure/TransactionRepository.js";

class TransactionService {
    constructor(private transactionRepository: TransactionRepository) {}

    public createTransaction(transaction: Transaction): Transaction {
        if (transaction.amount <= 0) {
            throw new Error("Amount must be greater than 0");
        }
        if (transaction.currency.length !== 3) {
            throw new Error("Currency code must be 3 characters long");
        }
        if (transaction.description && transaction.description.length > 100) {
            throw new Error("Description must be at most 100 characters long");
        }
        this.transactionRepository.add(transaction);
        return transaction;
    }

    public getTransactionById(id: string): Transaction | null {
        return this.transactionRepository.getById(id);
    }

    public getTransactions(): Transaction[] {
        return this.transactionRepository.getTransactions();
    }

    public getTransactionsLength(): number {
        return this.transactionRepository.getTransactionsLength();
    }

    public getPaginated(page: number, pageSize: number): Transaction[] {
        return this.transactionRepository.getPaginated(page, pageSize);
    }
}

export default TransactionService;