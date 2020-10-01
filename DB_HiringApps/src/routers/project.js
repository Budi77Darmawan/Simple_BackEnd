const { Router } = require('express')
const {
  listProject,
  listProjectbyID,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/project')
const { authorization, authorizationRecruiters } = require('../middleware/auth')
const uploadImage = require('../middleware/multer')

const router = Router()

router.get('/', authorization, listProject)
router.get('/:id', authorization, listProjectbyID)
router.post('/', authorizationRecruiters, uploadImage, createProject)
router.patch('/:id', authorizationRecruiters, uploadImage, updateProject)
router.delete('/:id', authorizationRecruiters, deleteProject)

module.exports = router
