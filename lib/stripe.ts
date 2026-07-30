import Stripe from "stripe";

console.log(
  "Stripe Secret:",
  process.env.STRIPE_SECRET_KEY?.substring(0, 20)
);

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  appInfo: {
    name: "Basevi Solutions",
    version: "1.0.0",
  },
});