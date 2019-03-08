const express = require("express");
const router = express.Router();
const { STRIPE_SECRET_KEY } = require("../../config/keys_dev");
const stripe = require("stripe")(STRIPE_SECRET_KEY);

// /api/payment/charge
router.post("/charge", async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: req.body.amount,
      currency: "usd",
      description: req.body.desc,
      source: "tok_mastercard"
    });
    return res.json({ status });
  } catch (err) {
    return res.status(500).end();
  }
});

module.exports = router;
