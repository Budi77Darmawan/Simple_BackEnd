const { Router } = require('express')
const {
  listExperience,
  createExperience,
  updateExperience,
  deleteExperience
} = require('../controllers/portofolio')
const { authorization, authorizationFreelancers } = require('../middleware/auth')

const router = Router()

router.get('/', authorization, listExperience)
router.post('/', authorizationFreelancers, createExperience)
router.patch('/:id', authorizationFreelancers, updateExperience)
router.delete('/:id', authorizationFreelancers, deleteExperience)

module.exports = router
