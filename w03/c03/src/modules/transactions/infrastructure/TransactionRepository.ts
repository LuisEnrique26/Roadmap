import { prisma } from "../../../core/config/database.js";

export interface Transaction {
    id: string;
    amount: number;
    currency: string;
    description: string;
    inspector_name?: string;
    userId?: string;
}

class TransactionRepository {

    public async add(transaction: Transaction): Promise<void> {
            await prisma.$transaction([
                prisma.transaction.create({
                    data: {
                        id: transaction.id,
                        amount: transaction.amount,
                        currency: transaction.currency,
                        description: transaction.description || "Without description",
                        userId: transaction.userId ?? null
                    }
                }),

                ...(transaction.userId ? [
                    prisma.user.update({
                        where: {
                            id: transaction.userId
                        },
                        data: {
                            balance: {
                                increment: transaction.amount
                            }
                        }
                    })
                ] : [])
            ]);
    }

    public async getById(id: string): Promise<Transaction | null> {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id
            },
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return transaction ? {
            id: transaction.id,
            amount: Number(transaction.amount),
            currency: transaction.currency,
            description: transaction.description ?? "Without description",
            inspector_name: transaction.user?.name ?? "Unknown"
        } : null;
    }

    public async getTransactions(): Promise<Transaction[]> {
        const transactions = await prisma.transaction.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return transactions.map((t: any) => ({
            id: t.id,
            amount: Number(t.amount),
            currency: t.currency,
            description: t.description,
            inspector_name: t.user?.name
        }));
    }

    public async getTransactionsLength(): Promise<number> {
        return await prisma.transaction.count();
    }

    public async getPaginated(page: number, pageSize: number): Promise<Transaction[]> {
        const transactions = await prisma.transaction.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return transactions.map((t: any) => ({
            id: t.id,
            amount: Number(t.amount),
            currency: t.currency,
            description: t.description,
            inspector_name: t.user?.name
        }));
    }
}

export default TransactionRepository;