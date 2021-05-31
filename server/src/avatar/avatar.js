const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 3000000 //3MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image file. Supported extensions are jpg, jpeg and png'))
        }//regular expression used, refer regex101.
        cb(null,true)
    }
})

module.exports = upload