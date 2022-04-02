const {isValidObjectId} = require("mongoose");
const Doctors = require("../../../models/Doctors");

// Update Description Of Doctor

const updateController = async (req, res) => {
  try {
  
    const decodedValue = req.user;
    if(!decodedValue) return res.status(403).json("No Authorization Token Sent")
    const id = decodedValue._id;
    if(!isValidObjectId(id)) return res.status(403).json("Invalid User")
    const doctor = await Doctors.findOne({_id : id})
    if(!doctor) return res.status(403).json("No Such User has Logged In")
    if(doctor._id == id){
       await doctor.updateOne({$set : req.body})
       return res.status(200).json("Doctor Information Is Updated")
    }else {
       return res.status(403).json("You can update your own info")
    }
   } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Update Profile Picture Of Doctor

const profilePicController = async(req,res)=>{
    try {
  
        const decodedValue = req.user;
        if(!decodedValue) return res.status(403).json("No Authorization Token Sent")
        const id = decodedValue._id;
        if(!isValidObjectId(id)) return res.status(403).json("Invalid User")
        const doctor = await Doctors.findOne({_id : id})
        if(!doctor) return res.status(403).json("No Such User has Logged In")
        if(doctor._id == id){
            if (req.file) {
                docFileName = process.env.URL +"public/uploads/" + req.file.filename;
              }
              const updated_user = await Doctors.findByIdAndUpdate(id, {
                profilePicture:docFileName
            },{new:true})
           return res.status(200).json(updated_user)
        }else {
           return res.status(403).json("You can update your own info")
        }
       } catch (error) {
        return res.status(500).json(error.message);
      }
}

module.exports = {updateController,profilePicController}
