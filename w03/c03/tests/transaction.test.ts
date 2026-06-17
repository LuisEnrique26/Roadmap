import { describe, expect, it, beforeEach } from 'vitest';
import TransactionService from '../src/modules/transactions/application/TransactionService.js';

class MockTransactionRepository {
  private memoryDb: any[] = [];

  async add(transaction: any) {
    this.memoryDb.push(transaction);
    return transaction;
  }

  async getTransactionsLength() {
    return this.memoryDb.length;
  }
}

describe('TransactionService Unit Test', () => {
  let transactionService: TransactionService;
  let mockRepository: MockTransactionRepository;

  beforeEach(() => {
    mockRepository = new MockTransactionRepository();
    transactionService = new TransactionService(mockRepository as any);
  });

  it('should create a transaction and return it', async () => {
    const transaction = {
      id: '1',
      amount: 100,
      currency: 'USD',
      description: 'Test transaction',
    };

    const transactionResponse = await transactionService.createTransaction(transaction);

    expect(transactionResponse).toEqual(
      expect.objectContaining({
        amount: 100,
        currency: 'USD',
        description: 'Test transaction',
      })
    );
  });

  it('should validate the amount', async () => {
    const transaction = {
      id: '1',
      amount: -100,
      currency: 'USD',
      description: 'Test transaction',
    };

    await expect(transactionService.createTransaction(transaction)).rejects.toThrow(
      'Amount must be greater than 0'
    );
  });

  it('should validate the currency code', async () => {
    const transaction = {
      id: '1',
      amount: 100,
      currency: 'US',
      description: 'Test transaction',
    };

    await expect(transactionService.createTransaction(transaction)).rejects.toThrow(
      'Currency code must be 3 characters long'
    );
  });

  it('should return the length of the transactions', async () => {
    await transactionService.createTransaction({
      id: '1',
      amount: 100,
      currency: 'USD',
      description: 'Test 1',
    });
    await transactionService.createTransaction({
      id: '2',
      amount: 100,
      currency: 'USD',
      description: 'Test 2',
    });

    const length = await transactionService.getTransactionsLength();
    expect(length).toBe(2);
  });
});
