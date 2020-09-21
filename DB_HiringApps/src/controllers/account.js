const {
  checkAccountModel,
  getAccountModel,
  getAccountByIDModel,
  createAccountModel,
  deleteAccountModel,
  updateAccountModel,
  checkEmailModel
} = require('../models/account')

module.exports = {
  getAccount: (req, res) => {
    let { page, limit, search } = req.query

    let { searchKey, serachValue } = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      serachValue = Object.values(search)[0]
    } else {
      searchKey = 'name'
      serachValue = search || ''
    }

    if (!limit) {
      limit = 10
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const offset = (page - 1) * limit

    getAccountModel(searchKey, serachValue, limit, offset, result => {
      if (result.length) {
        res.status(201).send({
          success: true,
          message: 'List Account',
          data: result
        })
      } else {
        res.send({
          success: true,
          message: 'There is no account on list'
        })
      }
    })
  },

  getAccountByID: (req, res) => {
    const id = req.params.id
    getAccountByIDModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Data account with id ${id}`,
          data: result
        })
      } else {
        res.send({
          success: false,
          message: `Account with id ${id} not found!`
        })
      }
    })
  },

  createAccount: (req, res) => {
    const { typeAccount, name, email, numberPhone, password } = req.body
    if (name && email && numberPhone && password) {
      checkEmailModel(email, result => {
        if (result.length) {
          res.status(500).send({
            success: false,
            message: 'Email has been registered!'
          })
        } else {
          createAccountModel([typeAccount, name, email, numberPhone, password], result => {
            res.status(201).send({
              success: true,
              message: 'Account has been created!'
            })
          })
        }
      })
    } else {
      res.status(500).send({
        success: false,
        message: 'All field must be filled!'
      })
    }
  },

  deleteAccount: (req, res) => {
    const id = req.params.id
    checkAccountModel(id, result => {
      if (result.length) {
        deleteAccountModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Account with id ${id} has been delete!`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed to delete account'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: `Account with id ${id} not found!`
        })
      }
    })
  },

  updateAccount: (req, res) => {
    const { name, email, numberPhone, password } = req.body
    const id = req.params.id

    if (name || email || numberPhone || password) {
      checkAccountModel(id, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return `${item[0]}='${item[1]}'`
          })
          updateAccountModel(id, data, result => {
            if (result.changedRows) {
              res.status(201).send({
                success: true,
                message: `Account with id ${id} has been update`
              })
            } else {
              res.status(201).send({
                success: false,
                message: 'Nothing was update in Account!'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: `Account with id ${id} not found!`
          })
        }
      })
    }
  }
}
