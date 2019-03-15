const express = require("express");
const router = express.Router();
const STRIPE_SECRET_KEY = require("../../config/keys").STRIPE_SECRET_KEY;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

// /api/payment/charge
router.post("/charge", async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: req.body.amount,
      currency: "usd",
      description: req.body.desc,
      source: req.body.source
    });
    return res.json({ status });
  } catch (err) {
    return res.status(500).end();
  }
});

module.exports = router;
