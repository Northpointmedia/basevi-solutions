# Basevi Solutions — Stripe Checkout integration

This package adds Stripe-hosted Checkout to the existing Next.js App Router website.

## Files to copy

Copy each file into the same path in the GitHub project:

- `app/page.tsx`
- `app/api/checkout/route.ts`
- `app/api/webhooks/stripe/route.ts`
- `app/payment/success/page.tsx`
- `app/payment/cancelled/page.tsx`
- `lib/stripe.ts`

## 1. Install dependencies

```bash
npm install stripe resend
```

## 2. Add Vercel environment variables

In Vercel: Project → Settings → Environment Variables.

Add:

- `NEXT_PUBLIC_SITE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `BUSINESS_NOTIFICATION_EMAIL`

Use Stripe test keys first. Never place `STRIPE_SECRET_KEY` in `page.tsx` or expose it as a `NEXT_PUBLIC_...` variable.

## 3. Create Stripe webhook

In Stripe Dashboard:

Developers → Webhooks → Add endpoint

Endpoint URL:

```text
https://basevisolutions.com/api/webhooks/stripe
```

Subscribe to:

```text
checkout.session.completed
```

Copy the webhook signing secret (`whsec_...`) into Vercel as `STRIPE_WEBHOOK_SECRET`.

## 4. Test before enabling live payments

Use Stripe test mode and the test card:

```text
4242 4242 4242 4242
```

Use any future expiration date, any three-digit CVC, and a valid ZIP code.

Confirm:

1. Checkout opens.
2. Payment returns to `/payment/success`.
3. Stripe shows the completed test payment.
4. The webhook receives HTTP 200.
5. Customer and business emails arrive.
6. The success return event appears in GTM/GA4.

## 5. Production launch

After tests pass:

1. Replace `STRIPE_SECRET_KEY` with the live key.
2. Create or verify the live-mode webhook.
3. Replace `STRIPE_WEBHOOK_SECRET` with the live webhook secret.
4. Redeploy Vercel.
5. Make one low-value live transaction and refund it after validation.

## Important pricing logic included

Direct Checkout is enabled for fixed-price services.

- Certified civil translations allow the client to choose the number of pages in Stripe Checkout.
- Tax preparation and complex legal translations remain quote-based because their displayed amounts are “starting at” prices.
- Government filing fees and third-party costs are expressly excluded.
