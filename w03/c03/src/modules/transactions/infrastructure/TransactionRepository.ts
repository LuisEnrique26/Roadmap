export interface Transaction {
    id: string;
    amount: number;
    currency: string;
    description: string;
}

class TransactionRepository {
    private readonly store: Transaction[] = [];

    public add(transaction: Transaction): void {
        this.store.push(transaction);
    }

    public getById(id: string): Transaction | null {
        const item = this.store.find((item) => item.id === id);
        if (!item) return null;
        return item;
    }

    public getTransactions(): Transaction[] {
        return [...this.store];
    }

    public getTransactionsLength(): number {
        return this.store.length;
    }

    public getPaginated(page: number, pageSize: number): Transaction[] {
        return this.store.slice((page - 1) * pageSize, page * pageSize);
    }
}

export default TransactionRepository;