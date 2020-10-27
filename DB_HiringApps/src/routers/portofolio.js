const { Router } = require('express')
const {
  listPortofolio,
  listPortofolioByID,
  createPortofolio,
  updatePortofolio,
  deletePortofolio
} = require('../controllers/portofolio')
const { authorization, authorizationFreelancers } = require('../middleware/auth')
const uploadImage = require('../middleware/multer')

const router = Router()

router.get('/', authorization, listPortofolio)
router.get('/:id', authorization, listPortofolioByID)
router.post('/', authorizationFreelancers, uploadImage, createPortofolio)
router.patch('/:id', authorizationFreelancers, uploadImage, updatePortofolio)
router.delete('/:id', authorizationFreelancers, deletePortofolio)

module.exports = router
