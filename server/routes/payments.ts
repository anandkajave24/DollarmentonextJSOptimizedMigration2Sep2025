import { Router } from "express";
import Stripe from "stripe";
import { storage } from "../storage";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

const router = Router();

// Subscription plans configuration
const SUBSCRIPTION_PLANS = {
  basic: {
    priceId: "price_basic_monthly", // Replace with actual Stripe price ID
    amount: 29900, // ₹299 in paise
    name: "Basic Plan",
  },
  premium: {
    priceId: "price_premium_monthly", // Replace with actual Stripe price ID
    amount: 49900, // ₹499 in paise
    name: "Premium Plan",
  },
  pro: {
    priceId: "price_pro_monthly", // Replace with actual Stripe price ID
    amount: 99900, // ₹999 in paise
    name: "Pro Plan",
  },
};

// Create subscription
router.post('/create-subscription', async (req: any, res) => {
  try {
    const { planId, userId = 'guest', userEmail = 'guest@example.com' } = req.body;

    if (!SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]) {
      return res.status(400).json({ error: 'Invalid plan ID' });
    }

    const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS];

    // Get or create Stripe customer
    let customer;
    const user = await storage.getUser(userId);
    
    if (user?.stripeCustomerId) {
      customer = await stripe.customers.retrieve(user.stripeCustomerId);
    } else {
      customer = await stripe.customers.create({
        email: userEmail,
        metadata: { userId },
      });

      // Update user with Stripe customer ID
      await storage.updateUserSubscription(userId, {
        stripeCustomerId: customer.id,
      });
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: plan.priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      currency: 'inr',
    });

    // Save payment transaction
    await storage.createPaymentTransaction({
      userId,
      stripeSubscriptionId: subscription.id,
      amount: plan.amount.toString(),
      currency: 'INR',
      status: 'pending',
      planId,
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = (invoice as any).payment_intent as Stripe.PaymentIntent;

    res.json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent?.client_secret,
      customerId: customer.id,
    });
  } catch (error: any) {
    console.error('Subscription creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Handle successful payment
router.post('/subscription-success', async (req: any, res) => {
  try {
    const { subscriptionId, planId, userId = 'guest' } = req.body;

    // Update user subscription status
    await storage.updateUserSubscription(userId, {
      subscriptionStatus: 'active',
      subscriptionPlan: planId,
      stripeSubscriptionId: subscriptionId,
      subscriptionStartDate: new Date(),
    });

    // Update payment transaction
    const transactions = await storage.getPaymentTransactions(userId);
    const pendingTransaction = transactions.find(t => t.stripeSubscriptionId === subscriptionId);
    
    if (pendingTransaction) {
      await storage.updatePaymentTransaction(pendingTransaction.id, {
        status: 'succeeded',
      });
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error('Payment success handling error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Cancel subscription
router.post('/cancel-subscription', async (req: any, res) => {
  try {
    const { userId = 'guest' } = req.body;
    const user = await storage.getUser(userId);

    if (!user?.stripeSubscriptionId) {
      return res.status(400).json({ error: 'No active subscription found' });
    }

    // Cancel at period end
    await stripe.subscriptions.update(user.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    // Update user status
    await storage.updateUserSubscription(userId, {
      subscriptionStatus: 'cancelled',
    });

    res.json({ success: true });
  } catch (error: any) {
    console.error('Subscription cancellation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get subscription plans
router.get('/plans', async (req, res) => {
  try {
    const plans = Object.entries(SUBSCRIPTION_PLANS).map(([id, plan]) => ({
      id,
      name: plan.name,
      amount: plan.amount,
      currency: 'INR',
    }));
    
    res.json(plans);
  } catch (error: any) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook to handle Stripe events
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      // Handle successful payment
      break;
    case 'invoice.payment_failed':
      // Handle failed payment
      break;
    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      // Handle subscription cancellation
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

export { router as paymentsRouter };