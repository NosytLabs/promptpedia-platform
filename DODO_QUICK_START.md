# Dodo Payments - Quick Start Guide

**5-Minute Setup**

---

## Step 1: Get API Keys

1. Go to https://dashboard.dodopayments.com
2. Sign in or create account
3. Navigate to **Settings > API Keys**
4. Copy:
   - Public Key: `pk_...`
   - Secret Key: `sk_...`
   - Webhook Secret: `ws_...`

---

## Step 2: Create Products

In Dodo Dashboard:
1. Go to **Products**
2. Create 3 products:
   - **Pro Plan** - $9.99/month
   - **Premium Plan** - $29.99/month
   - **Enterprise** - Custom pricing

3. Copy Product IDs (e.g., `prod_...`)

---

## Step 3: Configure Environment

Create `.env.local`:

```env
DODO_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_DODO_PUBLIC_KEY=pk_test_xxxxx
DODO_WEBHOOK_SECRET=ws_test_xxxxx

DODO_PRO_PRODUCT_ID=prod_pro_xxxxx
DODO_PREMIUM_PRODUCT_ID=prod_premium_xxxxx
DODO_ENTERPRISE_PRODUCT_ID=prod_enterprise_xxxxx
```

---

## Step 4: Set Up Webhook

In Dodo Dashboard:
1. Go to **Webhooks**
2. Add endpoint: `https://your-domain.com/api/webhooks/dodo`
3. Select events:
   - ✅ subscription.created
   - ✅ subscription.updated
   - ✅ subscription.canceled
   - ✅ invoice.paid
   - ✅ invoice.payment_failed

---

## Step 5: Deploy & Test

```bash
# Build
npm run build

# Start dev server
npm run dev

# Test checkout
# 1. Go to http://localhost:3000/settings/billing
# 2. Click "Upgrade to Pro"
# 3. Should redirect to Dodo checkout
```

---

## Testing with Test Cards

Dodo provides test payment methods. Use the card provided in their documentation to test without real charges.

---

## Files Overview

| File | Purpose |
|------|---------|
| `/src/lib/dodo-payments.ts` | Core SDK integration |
| `/src/lib/dodo-checkout.ts` | Client-side helpers |
| `/src/app/api/checkout` | Create checkout sessions |
| `/src/app/api/webhooks/dodo` | Handle webhook events |
| `/src/components/billing/checkout-button.tsx` | Upgrade button |
| `/src/app/settings/billing/page.tsx` | Billing page |

---

## API Endpoints

### Create Checkout
```bash
GET /api/checkout?tier=PRO
GET /api/checkout?tier=PREMIUM
GET /api/checkout?tier=ENTERPRISE
```

Response:
```json
{
  "success": true,
  "data": {
    "checkoutUrl": "https://checkout.dodo...",
    "sessionId": "sess_...",
    "tier": "PRO",
    "price": 9.99
  }
}
```

### Cancel Subscription
```bash
POST /api/user/subscription/cancel
```

---

## Common Issues

### Issue: Checkout returns "Product ID not configured"
**Fix:** Check `DODO_*_PRODUCT_ID` environment variables

### Issue: Webhook not firing
**Fix:** Verify webhook URL in Dodo dashboard matches your domain

### Issue: "Unauthorized" on API calls
**Fix:** Ensure user is logged in via NextAuth

---

## Next Steps

1. ✅ Add email notifications (send receipt after payment)
2. ✅ Add payment history page
3. ✅ Implement refund handling
4. ✅ Add usage-based billing

---

## Resources

- Full Setup: `DODO_PAYMENTS_SETUP.md`
- Implementation Details: `DODO_PAYMENTS_IMPLEMENTATION_SUMMARY.md`
- Dodo Docs: https://docs.dodopayments.com
- Dashboard: https://dashboard.dodopayments.com

---

**Status:** Ready for configuration and testing  
**Estimated Setup Time:** 15-20 minutes  
**Production Ready:** Yes

