const { Router } = require('express')
const {
  listFreelancers,
  listFreelancersByID,
  updateFreelancers
} = require('../controllers/freelancers')
const { authorization, authorizationFreelancers } = require('../middleware/auth')
const uploadImage = require('../middleware/multer')

const router = Router()

router.get('/', authorization, listFreelancers)
router.get('/:id', authorization, listFreelancersByID)
router.patch('/', authorizationFreelancers, uploadImage, updateFreelancers)

module.exports = router
