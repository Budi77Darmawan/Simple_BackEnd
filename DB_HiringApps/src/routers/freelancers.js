const { Router } = require('express')
const {
  getFreelancers,
  createFreelancers,
  deleteFreelancers,
  updateFreelancers
} = require('../controllers/freelancers')

const router = Router()

router.get('/', getFreelancers)
router.post('/', createFreelancers)
router.delete('/', deleteFreelancers)
router.patch('/', updateFreelancers)

module.exports = router
