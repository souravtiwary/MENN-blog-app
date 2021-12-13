const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//router from /routes/*
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");

//app
const app = express();

//database(moongoDB)
mongoose
  .connect(process.env.DATABASE_CLOUD, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected"));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
// when the client-side is under development
if (process.env.NODE_ENV === "development")
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));

// routes middleware
//begain all routes from /api
app.use("/api", blogRoutes);
app.use("/api", authRoutes);

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Node Server Running on port ${port}`);
});
