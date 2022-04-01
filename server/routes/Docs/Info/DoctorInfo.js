const { updateController, profilePicController } = require("../../../controllers/Docs/Info/UpdateController");
const { verifyDocJWT } = require("../../../middlewares/Doctors/VerifyJwt");
const multer = require("multer")
const path = require("path");
const { getController } = require("../../../controllers/Docs/Info/GetController");
const router = require("express").Router();




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(require.main.filename),"public/uploads")) // getting the filename from the root directory
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


// Update Doctor Info

router.put("/updateProfilePic",verifyDocJWT,upload.single('files'),profilePicController)
router.put("/updateInfo",verifyDocJWT,updateController)
router.get("/getInfo",verifyDocJWT,getController)

module.exports = router