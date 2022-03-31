const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const DocRegisterRoute = require("./routes/Docs/Auth/register")
const DocLogInRoute = require("./routes/Docs/Auth/login")

dotenv.config();

app.use(cors());

const URL = process.env.localhost || 5000;

mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to Database");
  }
);

// MiddleWares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// For Docs

app.use("/doc",DocRegisterRoute)
app.use("/doc",DocLogInRoute)




// For Patients



app.listen(URL, () => {
  console.log("Server is running");
});
