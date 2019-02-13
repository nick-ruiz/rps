const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
// const path = require("path");

const customers = require("./routes/api/customers");
const admins = require("./routes/api/admins");

const app = express();

// Body parser middleware
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
app.use("/api/customers", customers);
app.use("/api/admin", admins);

// // Server static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
