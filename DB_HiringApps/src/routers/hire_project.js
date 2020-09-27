const { Router } = require('express')
const {
  createHireProject,
  updateHireProject,
  deleteHireProject
} = require('../controllers/hire_project')
const { authorization, authorizationRecruiters } = require('../middleware/auth')

const router = Router()

router.post('/', authorizationRecruiters, createHireProject)
router.patch('/:id', authorization, updateHireProject)
router.delete('/', authorizationRecruiters, deleteHireProject)

module.exports = router
