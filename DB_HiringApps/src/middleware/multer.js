const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './src/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[1])
  }
})

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true)
  } else {
    return callback(new Error('Extension file must be JPG or PNG'), false)
  }
}

const limits = { fileSize: 1024 * 1024 * 1 }

const upload = multer({ storage, fileFilter, limits }).single('image')

const uploadFile = (req, response, next) => {
  upload(req, response, function (err) {
    if (err instanceof multer.MulterError) {
      response.status(400).send({
        success: false,
        message: err.message
      })
    } else if (err) {
      response.status(400).send({
        success: false,
        message: err.message
      })
    }
    next()
  })
}

module.exports = uploadFile
