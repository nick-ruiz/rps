const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load User model
const Invoice = require("../../models/Invoice");

// Load validation
const validateInvoiceInput = require("../../validation/invoice");

// @route   POST api/invoice/:id
// @desc    Create invoice
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateInvoiceInput(req.body);
    if (!req.user.admin) {
      errors.admin = "User not authorized";
      return res.status(401).json(errors);
    }
    // Check validation
    if (!isValid) {
      // If any errors send 400 with errors object
      return res.status(400).json(errors);
    }
    User.findById(req.params.id).then(user => {
      if (!user) {
        errors.user = "User not found";
        return res.status(400).json(errors);
      }
      const newInvoice = new Invoice({
        user: req.params.id
      });
      if (req.body.date) {
        newInvoice.date = req.body.date;
      }
      if (req.body.service && req.body.cost) {
        const newService = {
          cost: req.body.cost,
          service: req.body.service
        };
        newInvoice.services.unshift(newService);
      }
      newInvoice.save().then(invoice => {
        return res.json(invoice);
      });
    });
  }
);

// @route   POST api/invoice/add/:id/:inv_id
// @desc    Add service to invoice
// @access  Private
router.post(
  "/add/:id/:inv_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.admin) {
      errors.admin = "User not authorized";
      return res.status(401).json(errors);
    }
    const { errors, isValid } = validateInvoiceInput(req.body);
    // Check validation
    if (!isValid) {
      // If any errors send 400 with errors object
      return res.status(400).json(errors);
    }

    Invoice.findOne({ _id: req.params.inv_id, user: req.params.id }).then(
      invoice => {
        if (!invoice) {
          errors.invoice = "Invoice not found";
          return res.status(400).json(errors);
        }
        // Get Fields
        const invoiceFields = {};
        if (req.body.paid) invoiceFields.paid = req.body.paid;
        if (req.body.date) invoiceFields.date = req.body.date;
        if (req.body.service) invoiceFields.service = req.body.service;
        if (req.body.cost) invoiceFields.cost = req.body.cost;
        invoice.services.unshift(invoiceFields);
        invoice.save().then(invoice => res.json(invoice));
      }
    );
  }
);

// @route   GET api/invoice
// @desc    Get invoices
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Invoice.find({ user: req.user.id })
      .sort({ date: -1 })
      .then(invoice => {
        if (!invoice) {
          errors.noinvoice = "There are no invoices for this user";
          return res.status(404).json(errors);
        }
        res.json(invoice);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/invoice/:id
// @desc    Get invoices
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Invoice.find({ user: req.params.id })
      .sort({ date: -1 })
      .then(invoice => {
        if (!invoice) {
          errors.noinvoice = "There are no invoices for this user";
          return res.status(404).json(errors);
        }
        return res.json(invoice);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/invoice/i/:id
// @desc    Get invoices
// @access  Private
router.get(
  "/i/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Invoice.find({ id: req.params.id })
      .then(invoice => {
        if (!invoice) {
          errors.noinvoice = "There are no invoices for this user";
          return res.status(404).json(errors);
        }
        return res.json(invoice);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/invoice/edit/:id/:inv_id/:serv_id
// @desc    Edit service in invoice
// @access  Private
router.post(
  "/edit/:id/:inv_id/:serv_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.admin) {
      errors.admin = "User not authorized";
      return res.status(401).json(errors);
    }
    const { errors, isValid } = validateInvoiceInput(req.body);
    // Check validation
    if (!isValid) {
      // If any errors send 400 with errors object
      return res.status(400).json(errors);
    }

    Invoice.findOne({ _id: req.params.inv_id, user: req.params.id }).then(
      invoice => {
        if (!invoice) {
          errors.invoice = "Invoice not found";
          return res.status(400).json(errors);
        }

        const index = invoice.services
          .map(item => item.id)
          .indexOf(req.params.serv_id);
        if (index < 0) {
          errors.service = "Service not found";
          return res.status(400).json(errors);
        }
        // Get Fields
        if (req.body.paid) invoice.services[index].paid = req.body.paid;
        if (req.body.service)
          invoice.services[index].service = req.body.service;
        if (req.body.cost) invoice.services[index].cost = req.body.cost;
        invoice.save().then(invoice => res.json(invoice));
      }
    );
  }
);

// @route   DELETE api/invoice/:id/:inv_id/:serv_id
// @desc    Delete service from invoice
// @access  Private
router.delete(
  "/:id/:inv_id/:serv_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Invoice.findOne({ _id: req.params.inv_id, user: req.params.id }).then(
      invoice => {
        if (!invoice) {
          errors.name = "Invoice doesn't exist";
          return res.status(400).json(errors);
        }
        // Get remove index
        const index = invoice.services
          .map(item => item.id)
          .indexOf(req.params.serv_id);
        if (index < 0) {
          errors.service = "Service not found";
          return res.status(400).json(errors);
        }
        // Splice out of array
        invoice.services.splice(index, 1);
        // Save
        invoice
          .save()
          .then(invoice => {
            return res.json(invoice);
          })
          .catch(err => res.status(404).json(err));
      }
    );
  }
);

// @route   DELETE api/invoices/:id/:inv_id
// @desc    Delete invoice from customer
// @access  Private
router.delete(
  "/:id/:inv_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Invoice.findOneAndRemove({
      _id: req.params.inv_id,
      user: req.params.id
    }).then(() => {
      res.json({ success: true });
    });
  }
);

module.exports = router;
