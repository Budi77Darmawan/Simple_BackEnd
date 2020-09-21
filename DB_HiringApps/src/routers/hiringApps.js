const { Router } = require('express')
const {
  getFreelancers
} = require('../controllers/hiringApps')

const router = Router()

router.get('/', getFreelancers)

module.exports = router
