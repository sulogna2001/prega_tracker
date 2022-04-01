const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Patients=require('../../../models/Patients');

const loginPatient = async (req,res) => {
    const {email,password} =req.body;
    try{
        const existingPatient= await Patients.findOne({email});
        if(!existingPatient){
            res.status(400).json({message:"Patient not found!!"});
        }
        const passwordCorrect= await bcrypt.compare(password,existingPatient.password);
        if(!passwordCorrect){
            return res.status(400).json({message:"Invalid password!!"});
        }
        const token = jwt.sign({email:existingPatient.email,name:existingPatient.name, id:existingPatient._id , phone:existingPatient.phone } ,process.env.JWT_SECRET_KEY);
        res.status(200).json({result:existingPatient , token : token});
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}
module.exports = { loginPatient };
