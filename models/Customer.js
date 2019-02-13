const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    streetNumber: {
      type: Number,
      required: true
    },
    streetName: {
      type: String,
      required: true
    },
    zipCode: {
      type: Number,
      required: true
    },
    state: {
      type: String,
      default: "California"
    },
    country: {
      type: String,
      default: "United States"
    }
  },
  invoice: [
    {
      service: {
        type: String,
        required: true
      },
      cost: {
        type: Number,
        required: true
      },
      paid: {
        type: Boolean,
        default: false
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Customer = mongoose.model("customers", CustomerSchema);
