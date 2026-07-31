import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY?.trim();

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not configured.");
}

if (
  !stripeSecretKey.startsWith("sk_test_") &&
  !stripeSecretKey.startsWith("sk_live_")
) {
  throw new Error("STRIPE_SECRET_KEY must be a valid Stripe secret key.");
}

export const stripe = new Stripe(stripeSecretKey, {
  appInfo: {
    name: "Basevi Solutions",
    version: "1.0.0",
  },
});