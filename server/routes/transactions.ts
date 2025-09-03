import express, { Request, Response } from "express";
import { z } from "zod";
import { storage } from "../storage";
import { insertFinancialTransactionSchema } from "@shared/schema";
import { nanoid } from 'nanoid';

export const transactionsRouter = express.Router();

// No authentication required - open access
const noAuth = (req: Request, res: Response, next: Function) => {
  (req as any).userId = 1; // Mock user ID for open access
  next();
};

// Get all transactions for the user
transactionsRouter.get("/", noAuth, async (req, res) => {
  try {
    const userId = (req as any).userId as number;
    const transactions = await storage.getTransactionsByUserId(userId);
    
    return res.json({
      success: true,
      transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
    });
  }
});

// Create a new transaction
transactionsRouter.post("/", noAuth, async (req, res) => {
  try {
    const userId = (req as any).userId as number;
    
    const transactionData = insertFinancialTransactionSchema.parse({
      ...req.body,
      userId,
      id: nanoid(), // Generate unique ID
    });
    
    const newTransaction = await storage.createTransaction(transactionData);
    
    return res.status(201).json({
      success: true,
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction data",
        errors: error.errors,
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Failed to create transaction",
    });
  }
});

// Delete a transaction
transactionsRouter.delete("/:id", noAuth, async (req, res) => {
  try {
    const userId = (req as any).userId as number;
    const transactionId = req.params.id;
    
    // First check if the transaction belongs to the user
    const transaction = await storage.getTransactionById(transactionId);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }
    
    if (transaction.userId !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this transaction",
      });
    }
    
    await storage.deleteTransaction(transactionId);
    
    return res.json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete transaction",
    });
  }
});

// Update transaction category
transactionsRouter.patch("/:id/category", noAuth, async (req, res) => {
  try {
    const userId = (req as any).userId as number;
    const transactionId = req.params.id;
    
    const schema = z.object({
      category: z.string(),
    });
    
    const { category } = schema.parse(req.body);
    
    // First check if the transaction belongs to the user
    const transaction = await storage.getTransactionById(transactionId);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }
    
    if (transaction.userId !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this transaction",
      });
    }
    
    const updatedTransaction = await storage.updateTransactionCategory(transactionId, category);
    
    return res.json({
      success: true,
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction category:", error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid category data",
        errors: error.errors,
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Failed to update transaction category",
    });
  }
});