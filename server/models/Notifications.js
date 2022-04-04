const mongoose = require("mongoose")

const NotificationSchema = new mongoose.Schema({
    doctorId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors",
    },
    patientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Patients"
    },
    context : {
        type : String
    },
    seen : {
        type: Boolean,
        default : false
    },
    accept : {
        type : String,
        enum : ['notaccepted','accepted'],
    }
})

module.exports = mongoose.model("Notifications", NotificationSchema);