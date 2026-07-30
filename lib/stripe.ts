import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
}

console.log(
  "Stripe key prefix:",
  process.env.STRIPE_SECRET_KEY.substring(0, 20)
);

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  appInfo: {
    name: "Basevi Solutions",
    version: "1.0.0",
  },
});