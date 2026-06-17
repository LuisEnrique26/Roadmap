import { describe, expect, it, vi, beforeAll } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';

vi.mock('../src/modules/transactions/infrastructure/TransactionRepository.js', () => {
  class MockTransactionRepository {
    async add(transaction: any) {
      return Promise.resolve(transaction);
    }

    async getTransactionsLength() {
      return Promise.resolve(0);
    }

    async getTransactions() {
      return Promise.resolve([]);
    }
  }

  return {
    __esModule: true,
    default: MockTransactionRepository,
    TransactionRepository: MockTransactionRepository,
  };
});

import { app } from '../index.js';

describe('TransactionApi Integration Test', () => {
  let validToken: string;

  beforeAll(async () => {
    const secret = process.env.JWT_SECRET || 'default_secret';
    validToken = jwt.sign({ id: '1', role: 'admin' }, secret, { expiresIn: '1h' });
  });

  it('should return 201 and the transaction', async () => {
    // Arrange
    const payload = {
      amount: 100,
      currency: 'USD',
    };
    // Act
    const response = await request(app)
      .post('/api/v1/transactions')
      .set({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${validToken}`,
      })
      .send(payload);
    // Assert
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.amount).toBe(payload.amount);
    expect(response.body.data.currency).toBe(payload.currency);
    expect(response.body.data.description).toBe('Without description');
  });

  it('should return a 401 and a error message', async () => {
    // Arrange
    const invalidPayload = {
      amount: 100,
      currency: 'USD',
      description: 'A very long description',
    };
    // Act
    const response = await request(app).post('/api/v1/transactions').send(invalidPayload);
    // Assert
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });
});
