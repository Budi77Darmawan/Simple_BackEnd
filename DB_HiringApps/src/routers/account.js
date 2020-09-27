const { Router } = require('express')
const {
  registerAccount,
  loginAccount,
  updateAccount,
  deleteAccount
} = require('../controllers/account')
const { authorization } = require('../middleware/auth')

const router = Router()

router.post('/register', registerAccount)
router.post('/login', loginAccount)
router.patch('/', authorization, updateAccount)
router.delete('/', authorization, deleteAccount)

module.exports = router
