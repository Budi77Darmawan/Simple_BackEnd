const { Router } = require('express')
const {
  getProject,
  getProjectByID,
  createProject,
  deleteProject,
  updateProject
} = require('../controllers/project')

const router = Router()

router.get('/', getProject)
router.get('/:id', getProjectByID)
router.post('/', createProject)
router.delete('/', deleteProject)
router.patch('/', updateProject)

module.exports = router
