const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const homeRoutes = require("./routes/home");
const complimentsRoutes = require("./routes/compliments");
const motivationRoutes = require("./routes/motivation");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", homeRoutes);
app.use("/compliments", complimentsRoutes);
app.use("/motivation", motivationRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running!");
});
