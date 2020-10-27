const { Router } = require('express')
const {
  createHireProject,
  listHireProject,
  updateHireProject,
  deleteHireProject,
  listFreelancersProject
} = require('../controllers/hire_project')
const { authorization, authorizationRecruiters } = require('../middleware/auth')

const router = Router()

router.post('/', authorizationRecruiters, createHireProject)
router.get('/', authorization, listHireProject)
router.patch('/:id', authorization, updateHireProject)
router.delete('/', authorizationRecruiters, deleteHireProject)

router.get('/freelancers', authorization, listFreelancersProject)

module.exports = router
