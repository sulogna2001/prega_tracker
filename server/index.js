const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

//Doc routes
const DocRegisterRoute = require("./routes/Docs/Auth/register");
const DocLogInRoute = require("./routes/Docs/Auth/login");
const DocUpdateInfo = require("./routes/Docs/Info/DoctorInfo");
//patient routes
const PatientRegister = require("./routes/Patient/Auth/Register");
const PatientLogin = require("./routes/Patient/Auth/Login");
const Patientinfo = require("./routes/Patient/Info/PatientInfo");
const ReviewRoutes = require("./routes/Patient/Reviews/Review")
//appointment routes
const AppointmentRoutes = require("./routes/Appointments/Appointments");
const SendInvite = require("./routes/Patient/AddDoc/AddDoc")
const NotificationRoutes = require("./routes/Notifications/Notifications")
//chat routes
const conversationRoutes=require("./routes/Chat/conversations")
const messageRoute=require("./routes/Chat/messages")
dotenv.config();

app.use(cors());

const URL = process.env.localhost || 5000;

// For using static files

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
app.use(express.urlencoded({ extended: true }));

// For Docs

app.use("/doc", DocRegisterRoute);
app.use("/doc", DocLogInRoute);
app.use("/doc", DocUpdateInfo);
app.use("/doc",SendInvite)

// For Notifications

app.use("/notification",NotificationRoutes)


// For Appointments

app.use("/appointment",AppointmentRoutes)
//chat
app.use("/chat/conversations" , conversationRoutes);
app.use("/chat/messages",messageRoute);
// For Patients
app.use("/patient", PatientRegister);
app.use("/patient", PatientLogin);
app.use("/patient", Patientinfo);
app.use("/review",ReviewRoutes)
app.listen(URL, () => {
  console.log("Server is running");
});
