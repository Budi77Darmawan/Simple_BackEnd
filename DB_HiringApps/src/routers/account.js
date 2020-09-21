const { Router } = require('express')
const {
  getAccount,
  getAccountByID,
  createAccount,
  deleteAccount,
  updateAccount
} = require('../controllers/account')

const router = Router()

router.get('/', getAccount)
router.get('/:id', getAccountByID)
router.post('/', createAccount)
router.delete('/:id', deleteAccount)
router.patch('/:id', updateAccount)

module.exports = router
