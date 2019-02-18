const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  services: [
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
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Invoice = mongoose.model("invoices", InvoiceSchema);
