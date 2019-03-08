const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routes/api/users");
const invoice = require("./routes/api/invoices");
const profile = require("./routes/api/profile");
const stripe = require("./routes/api/payment");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use routes
app.use("/api/users", users);
app.use("/api/invoice", invoice);
app.use("/api/profile", profile);
app.use("/api/payment", stripe);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
