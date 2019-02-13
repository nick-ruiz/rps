const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Customer model
const Customer = require("../../models/Customer");

// Load validation input
const validateAddInput = require("../../validation/add");
const validateInvoiceInput = require("../../validation/invoice");

// @route   GET api/customers/test
// @desc    Tests customers route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Customer Works" }));

// @route   POST api/customers/
// @desc    Add customer
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAddInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Customer.findOne({ name: req.body.name.toLowerCase() }).then(customer => {
      if (customer) {
        errors.name = "Customer already exists";
        return res.status(400).json(errors);
      } else {
        const newCustomer = new Customer({
          name: req.body.name.toLowerCase(),
          address: {
            streetNumber: req.body.streetNumber,
            streetName: req.body.streetName.toLowerCase(),
            zipCode: req.body.zipCode
          }
        });
        newCustomer
          .save()
          .then(customer => res.json(customer))
          .catch(err => console.log(err));
      }
    });
  }
);

// @route   GET api/customers/c/:id
// @desc    Get customer by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Customer.findById(req.params.id).then(customer => {
      if (!customer) {
        errors.name = "Customer doesn't exist";
        return res.status(400).json(errors);
      } else {
        res.json(customer);
      }
    });
  }
);

// @route   POST api/customers/:id
// @desc    Add invoice
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateInvoiceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Customer.findById(req.params.id).then(customer => {
      if (!customer) {
        errors.name = "Customer doesn't exist";
        return res.status(400).json(errors);
      } else {
        const newInvoice = {
          service: req.body.service,
          cost: req.body.cost
        };
        // Add to invoice array
        customer.invoice.unshift(newInvoice);
        customer.save().then(customer => res.json(customer));
      }
    });
  }
);

// @route   GET api/customers/all
// @desc    Get all customers
// @access  Private
router.get(
  "/c/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Customer.find()
      //.populate("customer", ["name", "address, invoice"])
      .then(customers => {
        if (!customers) {
          errors.nocustomer = "There are no customers";
          return res.status(404).json(errors);
        }
        res.json(customers);
      })
      .catch(err =>
        res.status(404).json({ customer: "There are no customers" })
      );
  }
);

// @route   GET api/customers/info
// @desc    Get customer by address
// @access  Public
router.get("/c/info", (req, res) => {
  const errors = {};
  Customer.findOne(
    {
      "address.streetNumber": req.body.streetNumber,
      "address.streetName": req.body.streetName,
      "address.zipCode": req.body.zipCode
    },
    "invoice"
  )
    .then(customer => {
      if (!customer) {
        errors.name = "Customer doesn't exist";
        return res.status(400).json(errors);
      } else {
        res.json(customer);
      }
    })
    .catch(err => {
      res.status(404).json({ custerror: "error customer" });
    });
});

// @route   DELETE api/customers/:id
// @desc    Delete customer
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Customer.findOneAndDelete({ _id: req.params.id })
      .then(() => {
        res.json({ sucess: true });
      })
      .catch(err => {
        errors.name = "Customer doesn't exist";
        return res.status(400).json(errors);
      });
  }
);

// @route   DELETE api/customers/c/:id/:inv_id
// @desc    Delete invoice from customer
// @access  Private
router.delete(
  "/:id/:inv_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Customer.findOne({ _id: req.params.id }).then(customer => {
      if (!customer) {
        errors.name = "Customer doesn't exist";
        return res.status(400).json(errors);
      }
      // Get remove index
      const removeIndex = customer.invoice
        .map(item => item.id)
        .indexOf(req.params.inv_id);
      // Splice out of array
      customer.invoice.splice(removeIndex, 1);
      // Save
      customer
        .save()
        .then(customer => res.json(customer))
        .catch(err => res.status(404).json(err));
    });
  }
);

module.exports = router;
