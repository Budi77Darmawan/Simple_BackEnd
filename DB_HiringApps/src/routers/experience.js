const { Router } = require('express')
const {
  getExperience,
  getExperienceByID,
  createExperience,
  deleteExperience,
  updateExperience
} = require('../controllers/experience')

const router = Router()

router.get('/', getExperience)
router.get('/:id', getExperienceByID)
router.post('/', createExperience)
router.delete('/', deleteExperience)
router.patch('/', updateExperience)

module.exports = router
