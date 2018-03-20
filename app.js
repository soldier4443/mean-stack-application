const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
    console.log("Connected to database " + config.database);
});

mongoose.connection.on("error", (err) => {
    console.log("Database Error: " + err);
});

const app = express();

const port = process.env.PORT || 8080;

// Enable cross origin resource sharing.
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Parsing response body with Json.
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Route any request based on /users to /routes/users.js
app.use("/users", require("./routes/users"));

app.get("/", function(request, response) {
    response.send("Invalid Endpoint");
});

app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server.
app.listen(port, () => {
    console.log("Server started on port " + port);
});
