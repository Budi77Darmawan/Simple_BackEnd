const { Router } = require('express')
const {
  listFreelancers,
  updateFreelancers
} = require('../controllers/freelancers')
const { authorization, authorizationFreelancers } = require('../middleware/auth')
const uploadImage = require('../middleware/multer')

const router = Router()

router.get('/', authorization, listFreelancers)
router.patch('/', authorizationFreelancers, uploadImage, updateFreelancers)

module.exports = router
