const { Router } = require('express')
const {
  getRecruiters,
  createRecruiters,
  deleteRecruiters,
  updateRecruiters
} = require('../controllers/recruiters')

const router = Router()

router.get('/', getRecruiters)
router.post('/', createRecruiters)
router.delete('/', deleteRecruiters)
router.patch('/', updateRecruiters)

module.exports = router
