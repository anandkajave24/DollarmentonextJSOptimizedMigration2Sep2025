import express, { Request, Response } from 'express';
import { z } from 'zod';
import { storage } from '../storage';
import { processSmsMessage } from '../services/smsService';

export const smsRouter = express.Router();

// Open access - no authentication required
const noAuth = (req: Request, res: Response, next: Function) => {
  // Set default guest user context
  (req as any).userId = 1; // Default guest user
  next();
};

// Get all SMS messages for the authenticated user
smsRouter.get("/messages", noAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as number;
    const processed = req.query.processed === 'true' ? true : 
                      req.query.processed === 'false' ? false : undefined;
    
    const messages = await storage.getSMSMessages(userId, processed);
    res.json(messages);
  } catch (error) {
    console.error('Error retrieving SMS messages:', error);
    res.status(500).json({ message: "Failed to retrieve SMS messages" });
  }
});

// Get all user devices for the authenticated user
smsRouter.get("/devices", noAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as number;
    const devices = await storage.getUserDevices(userId);
    res.json(devices);
  } catch (error) {
    console.error('Error retrieving user devices:', error);
    res.status(500).json({ message: "Failed to retrieve user devices" });
  }
});

// Register a new device for the authenticated user
smsRouter.post("/devices", noAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as number;
    
    // Validate request body
    const deviceSchema = z.object({
      deviceId: z.string(),
      name: z.string(),
      platform: z.string(),
      verified: z.boolean().optional()
    });
    
    const validationResult = deviceSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        message: "Invalid device data", 
        errors: validationResult.error.errors 
      });
    }
    
    // Check if device already exists for this user
    const existingDevice = await storage.getUserDeviceByDeviceId(
      userId, 
      req.body.deviceId
    );
    
    if (existingDevice) {
      // Update the existing device
      const updatedDevice = await storage.updateUserDeviceByDeviceId(
        userId,
        req.body.deviceId,
        {
          name: req.body.name,
          platform: req.body.platform
        }
      );
      
      return res.json(updatedDevice);
    }
    
    // Create a new device record
    const newDevice = await storage.createUserDevice({
      userId: userId.toString(),
      deviceId: req.body.deviceId,
      name: req.body.name,
      platform: req.body.platform,
      verified: false
    });
    
    res.status(201).json(newDevice);
  } catch (error) {
    console.error('Error registering device:', error);
    res.status(500).json({ message: "Failed to register device" });
  }
});

// Register a device for SMS verification (does not require authentication)
smsRouter.post("/devices/register", async (req: Request, res: Response) => {
  try {
    // Special case - allow mock registration for demos without requiring authentication
    const userId = 1; // Use a mock user ID for demo purposes
    
    // Validate request body
    const registerSchema = z.object({
      deviceId: z.string(),
      name: z.string(),
      platform: z.string(),
      phoneNumber: z.string()
    });
    
    const validationResult = registerSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        message: "Invalid registration data", 
        errors: validationResult.error.errors 
      });
    }
    
    // Check if device already exists
    const existingDevice = await storage.getUserDeviceByDeviceId(
      userId,
      req.body.deviceId
    );
    
    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    if (existingDevice) {
      // Update existing device with new verification code
      const updatedDevice = await storage.updateUserDeviceByDeviceId(
        userId,
        req.body.deviceId,
        {
          verified: false,
          verificationCode
        }
      );
      
      // In a real application, we would send an SMS with the verification code here
      console.log(`SMS Verification code for ${req.body.phoneNumber}: ${verificationCode}`);
      
      if (!updatedDevice) {
        return res.status(500).json({ message: "Failed to update device" });
      }
      
      return res.json({
        message: "Verification code sent successfully",
        deviceId: updatedDevice.deviceId
      });
    }
    
    // Create a new device with verification code
    const newDevice = await storage.createUserDevice({
      userId: userId.toString(),
      deviceId: req.body.deviceId,
      name: req.body.name,
      platform: req.body.platform,
      verified: false,
      verificationCode
    });
    
    // In a real application, we would send an SMS with the verification code here
    console.log(`SMS Verification code for ${req.body.phoneNumber}: ${verificationCode}`);
    
    res.status(201).json({
      message: "Verification code sent successfully",
      deviceId: newDevice.deviceId
    });
    
  } catch (error) {
    console.error('Error registering device for verification:', error);
    res.status(500).json({ 
      message: "Failed to register device for verification",
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Verify a device for the authenticated user
smsRouter.post("/devices/verify", async (req: Request, res: Response) => {
  try {
    // Special case - allow mock verification for demos without requiring authentication
    const userId = 1; // Use a mock user ID for demo purposes
    
    // Validate request body
    const verifySchema = z.object({
      deviceId: z.string(),
      verificationCode: z.string().optional()
    });
    
    const validationResult = verifySchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        message: "Invalid verification data", 
        errors: validationResult.error.errors 
      });
    }
    
    // Check if device exists
    const device = await storage.getUserDeviceByDeviceId(userId, req.body.deviceId);
    
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    
    // If verification code was provided, check it matches
    if (req.body.verificationCode && device.verificationCode) {
      if (req.body.verificationCode !== device.verificationCode) {
        return res.status(400).json({ message: "Invalid verification code" });
      }
    } else {
      console.log("Verification code check skipped for demo");
    }
    
    // Mark the device as verified
    const updatedDevice = await storage.updateUserDeviceByDeviceId(
      userId,
      req.body.deviceId,
      {
        verified: true,
        verificationCode: null, // Clear the code after verification
        
      }
    );
    
    if (!updatedDevice) {
      return res.status(500).json({ message: "Failed to verify device" });
    }
    
    res.json(updatedDevice);
  } catch (error) {
    console.error('Error verifying device:', error);
    res.status(500).json({ message: "Failed to verify device" });
  }
});

// Delete a device for the authenticated user
smsRouter.delete("/devices/:id", noAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as number;
    const deviceId = req.params.id;
    
    // Check if device exists and belongs to user
    const device = await storage.getUserDevice(deviceId);
    
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    
    if (device.userId !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this device" });
    }
    
    // Delete the device
    const deleted = await storage.deleteUserDevice(deviceId);
    
    if (deleted) {
      res.status(200).json({ message: "Device deleted successfully" });
    } else {
      res.status(500).json({ message: "Failed to delete device" });
    }
  } catch (error) {
    console.error('Error deleting device:', error);
    res.status(500).json({ message: "Failed to delete device" });
  }
});

// Sync SMS messages from a device
smsRouter.post("/sync", noAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as number;
    
    // Validate request body
    const syncSchema = z.object({
      deviceId: z.string(),
      messages: z.array(z.object({
        messageId: z.string(),
        messageBody: z.string(),
        senderNumber: z.string(),
        receivedAt: z.string().transform(val => new Date(val))
      }))
    });
    
    const validationResult = syncSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        message: "Invalid sync data", 
        errors: validationResult.error.errors 
      });
    }
    
    const { deviceId, messages } = validationResult.data;
    
    // Check if device is registered and verified
    const device = await storage.getUserDeviceByDeviceId(userId, deviceId);
    
    if (!device) {
      return res.status(404).json({ message: "Device not registered" });
    }
    
    if (!device.verified) {
      return res.status(403).json({ message: "Device not verified" });
    }
    
    // Update last sync time
    await storage.updateUserDeviceByDeviceId(
      userId,
      deviceId,
      {  }
    );
    
    // Process each message
    const results = [];
    
    for (const message of messages) {
      // Check if message already exists
      const existingMessages = await storage.getSMSMessages(userId);
      const exists = existingMessages.some(m => 
        m.sender === message.senderNumber && 
        m.body === message.messageBody &&
        Math.abs(m.receivedAt.getTime() - message.receivedAt.getTime()) < 60000 // Within 1 minute
      );
      
      if (!exists) {
        // Create new SMS message
        const newMessage = await storage.createSMSMessage({
          userId: userId.toString(),
          body: message.messageBody,
          sender: message.senderNumber,
          receivedAt: message.receivedAt,
          deviceId
        });
        
        results.push(newMessage);
      }
    }
    
    res.status(200).json({ 
      message: "Sync completed successfully",
      synced: results.length,
      total: messages.length
    });
  } catch (error) {
    console.error('Error syncing messages:', error);
    res.status(500).json({ 
      message: "Failed to sync messages",
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Get financial transactions for the authenticated user
smsRouter.get("/transactions", noAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as number;
    const transactions = await storage.getFinancialTransactions(userId);
    res.json(transactions);
  } catch (error) {
    console.error('Error retrieving financial transactions:', error);
    res.status(500).json({ message: "Failed to retrieve financial transactions" });
  }
});

// Process unprocessed SMS messages to extract financial transactions
smsRouter.post("/process", noAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as number;
    
    // Get unprocessed messages
    const unprocessedMessages = await storage.getSMSMessages(userId, false);
    
    if (unprocessedMessages.length === 0) {
      return res.json({ 
        message: "No unprocessed messages found",
        processed: 0
      });
    }
    
    // Process each message
    const results = [];
    
    for (const message of unprocessedMessages) {
      const transaction = await processSmsMessage(message);
      if (transaction) {
        results.push(transaction);
      }
    }
    
    res.json({ 
      message: "Processing completed successfully",
      processed: unprocessedMessages.length,
      transactions: results.length
    });
  } catch (error) {
    console.error('Error processing messages:', error);
    res.status(500).json({ 
      message: "Failed to process messages", 
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Manual SMS upload endpoint
smsRouter.post("/upload", noAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as number;
    
    // Validate request body
    const uploadSchema = z.object({
      messageBody: z.string(),
      senderNumber: z.string(),
      receivedAt: z.string().transform(val => new Date(val))
    });
    
    const validationResult = uploadSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        message: "Invalid message data", 
        errors: validationResult.error.errors 
      });
    }
    
    const { messageBody, senderNumber, receivedAt } = validationResult.data;
    
    // Create a new SMS message
    const message = await storage.createSMSMessage({
      userId: userId.toString(),
      body: messageBody,
      sender: senderNumber,
      receivedAt,
      deviceId: 'manual'
    });
    
    // Process the message
    const transaction = await processSmsMessage(message);
    
    res.status(201).json({ 
      message: "Message uploaded and processed successfully",
      sms: message,
      transaction
    });
  } catch (error) {
    console.error('Error uploading message:', error);
    res.status(500).json({ 
      message: "Failed to upload message", 
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Get spending insights by category
smsRouter.get("/insights/categories", noAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as number;
    const transactions = await storage.getFinancialTransactions(userId);
    
    // Get expenses only
    const expenses = transactions.filter(t => t.transactionType === 'debit');
    
    // Group by category
    const categories: Record<string, { total: number, count: number }> = {};
    
    expenses.forEach(transaction => {
      const category = transaction.category || 'uncategorized';
      
      if (!categories[category]) {
        categories[category] = { total: 0, count: 0 };
      }
      
      categories[category].total += transaction.amount;
      categories[category].count += 1;
    });
    
    // Convert to array format
    const results = Object.entries(categories).map(([category, data]) => ({
      category,
      total: data.total,
      count: data.count,
      averageAmount: data.total / data.count
    }));
    
    // Sort by total amount (highest first)
    results.sort((a, b) => b.total - a.total);
    
    res.json(results);
  } catch (error) {
    console.error('Error retrieving category insights:', error);
    res.status(500).json({ message: "Failed to retrieve category insights" });
  }
});

// Get spending insights by merchant
smsRouter.get("/insights/merchants", noAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as number;
    const transactions = await storage.getFinancialTransactions(userId);
    
    // Get expenses only
    const expenses = transactions.filter(t => t.transactionType === 'debit');
    
    // Group by merchant
    const merchants: Record<string, { total: number, count: number }> = {};
    
    expenses.forEach(transaction => {
      const merchant = transaction.merchantName || 'unknown';
      
      if (!merchants[merchant]) {
        merchants[merchant] = { total: 0, count: 0 };
      }
      
      merchants[merchant].total += transaction.amount;
      merchants[merchant].count += 1;
    });
    
    // Convert to array format
    const results = Object.entries(merchants).map(([merchant, data]) => ({
      merchant,
      total: data.total,
      count: data.count,
      averageAmount: data.total / data.count
    }));
    
    // Sort by total amount (highest first)
    results.sort((a, b) => b.total - a.total);
    
    res.json(results);
  } catch (error) {
    console.error('Error retrieving merchant insights:', error);
    res.status(500).json({ message: "Failed to retrieve merchant insights" });
  }
});

// Get spending insights by time period
smsRouter.get("/insights/timeperiod", noAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as number;
    const period = req.query.period as string || 'monthly';
    const transactions = await storage.getFinancialTransactions(userId);
    
    // Get expenses only
    const expenses = transactions.filter(t => t.transactionType === 'debit');
    
    // Group by time period
    const periods: Record<string, { total: number, count: number }> = {};
    
    expenses.forEach(transaction => {
      const date = new Date(transaction.transactionDate);
      let key: string;
      
      if (period === 'daily') {
        key = date.toISOString().split('T')[0]; // YYYY-MM-DD
      } else if (period === 'weekly') {
        // Get start of week (Sunday)
        const startOfWeek = new Date(date);
        const day = startOfWeek.getDay();
        startOfWeek.setDate(startOfWeek.getDate() - day);
        key = startOfWeek.toISOString().split('T')[0];
      } else if (period === 'yearly') {
        key = date.getFullYear().toString();
      } else {
        // Default: monthly
        key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      }
      
      if (!periods[key]) {
        periods[key] = { total: 0, count: 0 };
      }
      
      periods[key].total += transaction.amount;
      periods[key].count += 1;
    });
    
    // Convert to array format
    const results = Object.entries(periods).map(([period, data]) => ({
      period,
      total: data.total,
      count: data.count,
      averageAmount: data.total / data.count
    }));
    
    // Sort by period (chronological)
    results.sort((a, b) => a.period.localeCompare(b.period));
    
    res.json(results);
  } catch (error) {
    console.error('Error retrieving time period insights:', error);
    res.status(500).json({ message: "Failed to retrieve time period insights" });
  }
});