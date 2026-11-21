// Games Pass plans. Checkout runs on Stripe Payment Links for the
// "PenGame Games Pass" product in the PenGame Publishing LLC Stripe account.
// To change a price, create a new Payment Link in Stripe and paste it here.

export const CONTACT_EMAIL = "Info@pengamepublishing.com";

export const PASS_PLANS = [
  {
    id: "monthly",
    name: "Monthly Pass",
    label: "Flexible adventures",
    price: "$4.99",
    period: "month",
    billed: "every month",
    checkoutUrl: "https://buy.stripe.com/dRm28rbdR9p57ZW6NG4wM04",
  },
  {
    id: "yearly",
    name: "Yearly Pass",
    label: "Save $19.89 a year",
    price: "$39.99",
    period: "year",
    billed: "every year",
    checkoutUrl: "https://buy.stripe.com/3cI00jchV1WDdkg9ZS4wM05",
    best: true,
  },
];
