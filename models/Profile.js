const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  address: {
    formattedAddress: {
      type: String,
      required: false
    },
    streetNumber: {
      type: Number,
      required: true
    },
    streetName: {
      type: String,
      required: true
    },
    city: {
      type: String,
      requried: true
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
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
