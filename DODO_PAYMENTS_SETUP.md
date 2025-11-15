# Dodo Payments Setup Guide

**Date:** November 15, 2024  
**Status:** ✅ INTEGRATED  
**Version:** 1.0

---

## Overview

Dodo Payments has been integrated into Promptpedia for subscription and payment processing. This replaces the previous Stripe stub with a fully functional payment system.

### What's Included

- ✅ Dodo Payments SDK integration (`dodopayments` library)
- ✅ Checkout page redirects with `dodopayments-checkout`
- ✅ Membership tier upgrade flow
- ✅ Webhook handlers for subscription events
- ✅ Database schema updates for Dodo fields
- ✅ Client-side checkout button component
- ✅ Billing page enhancements

---

## Installation Complete ✅

The following packages are already installed:

```json
{
  "dodopayments": "^2.5.0",
  "dodopayments-checkout": "^1.3.1"
}
```

---

## Environment Setup

### Step 1: Get Dodo Payments API Keys

1. Go to [Dodo Payments Dashboard](https://dashboard.dodopayments.com)
2. Create an account if you haven't already
3. Navigate to **Settings > API Keys**
4. Copy your keys:
   - **Public Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)
   - **Webhook Secret** (starts with `ws_`)

### Step 2: Configure Environment Variables

Update your `.env.local` file with:

```env
# Dodo Payments Configuration
NEXT_PUBLIC_DODO_PUBLIC_KEY=pk_test_xxxxx...
DODO_SECRET_KEY=sk_test_xxxxx...
DODO_WEBHOOK_SECRET=ws_test_xxxxx...

# Dodo Payments Product IDs (after creating products)
DODO_PRO_PRODUCT_ID=prod_xxxxx...
DODO_PREMIUM_PRODUCT_ID=prod_xxxxx...
DODO_ENTERPRISE_PRODUCT_ID=prod_xxxxx...
```

### Step 3: Create Products in Dodo Dashboard

1. Go to **Products** in Dodo Payments Dashboard
2. Create products for each tier:
   - **Pro Plan** - $9.99/month
   - **Premium Plan** - $29.99/month
   - **Enterprise Plan** - Custom pricing

3. For each product:
   - Set the price
   - Set billing interval (monthly)
   - Copy the Product ID
   - Add to `.env.local`

---

## Database Setup

### Step 1: Create Migration

```bash
npx prisma migrate dev --name add_dodo_payments
```

### Step 2: Review Changes

The `Membership` model now includes:

```prisma
model Membership {
  // ... existing fields ...
  
  // Dodo Payments fields (preferred)
  dodoCustomerId        String?
  dodoSubscriptionId    String?
  
  // Legacy Stripe fields (for backward compatibility)
  stripeCustomerId      String?
  stripeSubscriptionId  String?
}
```

### Step 3: Apply Migration

```bash
npx prisma db push
```

---

## API Endpoints

### 1. Create Checkout Session

**Endpoint:** `GET /api/checkout?tier=PRO`

**Request:**
```bash
curl -H "Authorization: Bearer SESSION_TOKEN" \
  http://localhost:3000/api/checkout?tier=PRO
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "checkoutUrl": "https://checkout.dodopayments.com/session/...",
    "sessionId": "sess_xxxxx",
    "tier": "PRO",
    "price": 9.99
  },
  "status": 200
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid membership tier",
  "code": "BAD_REQUEST",
  "status": 400
}
```

### 2. Cancel Subscription

**Endpoint:** `POST /api/user/subscription/cancel`

**Request:**
```bash
curl -X POST \
  -H "Authorization: Bearer SESSION_TOKEN" \
  http://localhost:3000/api/user/subscription/cancel
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "message": "Subscription canceled successfully",
    "cancelAtPeriodEnd": true
  },
  "status": 200
}
```

### 3. Webhook Handler

**Endpoint:** `POST /api/webhooks/dodo`

**Expected Headers:**
```
x-dodo-signature: [webhook signature]
```

**Event Types Handled:**
- `subscription.created` - New subscription activated
- `subscription.updated` - Subscription changed
- `subscription.canceled` - Subscription canceled
- `subscription.failed` - Payment failed
- `invoice.paid` - Invoice payment received
- `invoice.payment_failed` - Invoice payment failed

---

## Webhook Setup

### Step 1: Configure Webhook URL

1. Go to **Webhooks** in Dodo Payments Dashboard
2. Add webhook endpoint:
   ```
   https://your-domain.com/api/webhooks/dodo
   ```

3. Enable event types:
   - ✅ subscription.created
   - ✅ subscription.updated
   - ✅ subscription.canceled
   - ✅ subscription.failed
   - ✅ invoice.paid
   - ✅ invoice.payment_failed

### Step 2: Verify Webhook Signature

The webhook handler automatically verifies signatures from Dodo Payments using the `DODO_WEBHOOK_SECRET`.

### Step 3: Test Webhooks

Use Dodo's webhook testing tool in the dashboard to send test events.

---

## Implementation Files

### Core Libraries

1. **`/src/lib/dodo-payments.ts`** (110 lines)
   - Dodo Payments client initialization
   - Checkout session creation
   - Subscription management
   - Webhook verification

2. **`/src/lib/dodo-checkout.ts`** (100 lines)
   - Client-side checkout utilities
   - Checkout modal initialization
   - Price formatting
   - Success/error handling

### API Routes

1. **`/src/app/api/checkout/route.ts`** (updated)
   - Creates Dodo checkout session
   - Validates membership tier
   - Returns checkout URL

2. **`/src/app/api/user/subscription/cancel/route.ts`** (updated)
   - Cancels Dodo subscription
   - Updates membership record
   - Handles errors gracefully

3. **`/src/app/api/webhooks/dodo/route.ts`** (NEW - 280 lines)
   - Handles all Dodo webhook events
   - Updates membership on subscription changes
   - Downgrades users on cancellation
   - Handles payment failures

### Components

1. **`/src/components/billing/checkout-button.tsx`** (NEW)
   - Reusable checkout button
   - Loading states
   - Error handling
   - Redirects to Dodo checkout

### Pages

1. **`/src/app/settings/billing/page.tsx`** (updated)
   - Uses new CheckoutButton component
   - Shows success/cancel messages
   - Displays Dodo-powered checkout

---

## Testing the Integration

### 1. Test Sign Up

```bash
npm run dev
# Visit http://localhost:3000
# Sign up with OAuth
```

### 2. Test Checkout

```bash
# Go to settings/billing
# Click "Upgrade to Pro"
# Should redirect to Dodo Payments checkout
```

### 3. Test Webhook (Local)

```bash
# Use Dodo's webhook testing tool
# or forward with ngrok:
# ngrok http 3000
# Add webhook URL: https://your-ngrok-url.ngrok.io/api/webhooks/dodo
```

### 4. Test Subscription States

After payment completes, verify:
- ✅ User membership tier updated
- ✅ Dodo subscription ID stored
- ✅ Current period dates set
- ✅ Features unlocked (if implemented)

---

## API Reference

### Dodo Payments SDK

```typescript
import { DodoPayments } from "dodopayments"

const client = new DodoPayments({
  apiKey: process.env.DODO_SECRET_KEY,
})

// Create checkout session
const session = await client.checkout.create({ ... })

// Create customer
const customer = await client.customers.create({ ... })

// Manage subscriptions
await client.subscriptions.retrieve(id)
await client.subscriptions.update(id, data)
await client.subscriptions.cancel(id)

// Handle webhooks
const event = await client.webhooks.validate(signature, body)
```

### Dodo Checkout Integration

```typescript
import { openDodoCheckout } from "@/lib/dodo-checkout"

await openDodoCheckout({
  publicKey: "pk_test_...",
  tier: "PRO",
  userId: "user_123",
  userEmail: "user@example.com",
})
```

---

## Error Handling

### Common Errors

1. **"Product ID not configured"**
   - Set `DODO_PRO_PRODUCT_ID` environment variable
   - Verify product exists in Dodo dashboard

2. **"Webhook signature invalid"**
   - Check `DODO_WEBHOOK_SECRET` is correct
   - Verify webhook secret matches in dashboard

3. **"Checkout URL not provided"**
   - Verify Dodo API keys are valid
   - Check network connectivity to Dodo

4. **"User not found"**
   - Ensure user exists before creating checkout
   - Verify user is authenticated

### Error Logging

Errors are logged to console in development:

```typescript
console.error("Error creating checkout session:", error)
```

For production, integrate with error tracking (Sentry, etc.).

---

## Security Considerations

1. **API Keys**
   - `DODO_SECRET_KEY` is server-side only ✅
   - `NEXT_PUBLIC_DODO_PUBLIC_KEY` is public ✅
   - Never expose secret key in client code

2. **Webhook Signature Verification**
   - All webhooks are verified with `DODO_WEBHOOK_SECRET`
   - Invalid signatures are rejected with 401

3. **User Validation**
   - All payment routes require authentication
   - User ID verified before processing

4. **Data Protection**
   - Subscription data stored in database
   - No credit card details stored locally
   - PCI compliance handled by Dodo

---

## Troubleshooting

### Checkout Not Opening

1. Check if `NEXT_PUBLIC_DODO_PUBLIC_KEY` is set
2. Verify network tab for API errors
3. Check browser console for JavaScript errors

### Subscription Not Updating After Payment

1. Verify webhook is configured correctly
2. Check webhook logs in Dodo dashboard
3. Verify `DODO_WEBHOOK_SECRET` matches

### Database Migration Issues

```bash
# Reset database (dev only)
npx prisma migrate reset

# Or manually apply schema
npx prisma db push --force-reset
```

---

## Next Steps

### Phase 1: Complete
- ✅ Dodo Payments SDK integrated
- ✅ Checkout flow implemented
- ✅ Webhook handlers ready
- ✅ Database updated

### Phase 2: Enhancement (Recommended)
- [ ] Add email notifications on payment
- [ ] Implement subscription management UI
- [ ] Add payment history/receipts
- [ ] Implement refund handling

### Phase 3: Advanced
- [ ] Usage-based billing
- [ ] Annual billing option
- [ ] Enterprise custom quotes
- [ ] API rate based on tier

---

## Resources

- [Dodo Payments Documentation](https://docs.dodopayments.com)
- [Dodo Payments Dashboard](https://dashboard.dodopayments.com)
- [API Reference](https://docs.dodopayments.com/api-reference)
- [Webhook Events](https://docs.dodopayments.com/webhooks)

---

## Support

For issues with:
- **Dodo Payments:** Contact [Dodo Support](mailto:support@dodopayments.com)
- **Promptpedia Integration:** Check this guide or review code comments

---

**Setup Status:** ✅ COMPLETE  
**Ready for Testing:** YES  
**Production Ready:** PENDING (test payment methods first)

