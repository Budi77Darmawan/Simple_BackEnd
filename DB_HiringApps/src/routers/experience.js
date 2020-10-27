const { Router } = require('express')
const {
  listExperience,
  listExperienceByID,
  createExperience,
  updateExperience,
  deleteExperience
} = require('../controllers/experience')
const { authorization, authorizationFreelancers } = require('../middleware/auth')

const router = Router()

router.get('/', authorization, listExperience)
router.get('/:id', authorization, listExperienceByID)
router.post('/', authorizationFreelancers, createExperience)
router.patch('/:id', authorizationFreelancers, updateExperience)
router.delete('/:id', authorizationFreelancers, deleteExperience)

module.exports = router
