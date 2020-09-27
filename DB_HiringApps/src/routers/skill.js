const { Router } = require('express')
const {
  addSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skill')
const { authorizationFreelancers } = require('../middleware/auth')

const router = Router()

router.post('/', authorizationFreelancers, addSkill)
router.patch('/:id', authorizationFreelancers, updateSkill)
router.delete('/', authorizationFreelancers, deleteSkill)

module.exports = router
