const { Router } = require('express')
const {
  listRecruiters,
  updateRecruiters
} = require('../controllers/recruiters')
const { authorization, authorizationRecruiters } = require('../middleware/auth')
const uploadImage = require('../middleware/multer')

const router = Router()

router.get('/', authorization, listRecruiters)
router.patch('/', authorizationRecruiters, uploadImage, updateRecruiters)

module.exports = router
