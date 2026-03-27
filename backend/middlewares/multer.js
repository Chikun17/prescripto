// import multer from 'multer'

// const storage = multer.diskStorage({
//     filename:function(req,file,callback){
//         callback(null,file.originalname)
//     }
// })

// const upload = multer({storage})

// export default upload


import multer from 'multer'
import fs from 'fs'

// Ensure the uploads folder exists
const uploadDir = './uploads'
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadDir) // save files to ./uploads
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    callback(null, uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ storage })

export default upload