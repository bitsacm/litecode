const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 1000000 //1MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image file. Supported extensions are jpg, jpeg and png'))
        }
        cb(null, true)
    }
})

module.exports = upload