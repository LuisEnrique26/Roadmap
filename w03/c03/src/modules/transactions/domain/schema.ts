import z from "zod";

export const createTransactionSchema = z.object({
    amount: z.number().int().positive("Amount should be a positive number"),
    currency: z.string().length(3, "Currency code should be 3 characters long"),
    description: z.string().max(100, "Description should be at most 100 characters long").optional()
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;