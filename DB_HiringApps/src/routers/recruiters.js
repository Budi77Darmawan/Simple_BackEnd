const { Router } = require('express')
const {
  listRecruiters,
  listRecruitersbyID,
  updateRecruiters
} = require('../controllers/recruiters')
const { authorization, authorizationRecruiters } = require('../middleware/auth')
const uploadImage = require('../middleware/multer')

const router = Router()

router.get('/', authorization, listRecruiters)
router.get('/:id', authorization, listRecruitersbyID)
router.patch('/', authorizationRecruiters, uploadImage, updateRecruiters)

module.exports = router
