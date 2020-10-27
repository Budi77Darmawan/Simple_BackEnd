const {
  checkAccountModel,
  registerAccountModel,
  updateAccountModel,
  deleteAccountModel
} = require('../models/account')
const bcryipt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv')

module.exports = {
  registerAccount: async (req, response) => {
    const { roleAccount, name, email, numberPhone, password, companyName, position } = req.body
    if (roleAccount && name && email && numberPhone && password) {
      const salt = bcryipt.genSaltSync(12)
      const encryptPassword = bcryipt.hashSync(password, salt)
      const setData = {
        roleAccount,
        name,
        email,
        numberPhone,
        password: encryptPassword
      }
      try {
        const check = await checkAccountModel(email)
        if (!check.length) {
          await registerAccountModel(setData, companyName, position)
          response.send({
            success: true,
            message: 'Success register account',
            data: { name, email }
          })
        } else {
          response.send({
            success: false,
            message: 'Email has been registered!'
          })
        }
      } catch {
        response.send({
          success: false,
          message: 'Bad request!'
        })
      }
    } else {
      response.status(500).send({
        success: false,
        message: 'All field must be filled!'
      })
    }
  },

  loginAccount: async (req, response) => {
    const { email, password } = req.body
    if (email && password) {
      const checkAccount = await checkAccountModel(email)
      if (checkAccount.length) {
        const checkPassword = bcryipt.compareSync(password, checkAccount[0].password)
        if (checkPassword) {
          const idAccount = checkAccount[0].id_account
          const { name, roleAccount, email, status } = checkAccount[0]
          let payload = { idAccount, name, roleAccount, email, status }
          const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: '10d' })
          payload = { ...payload, token }
          response.status(201).send({
            success: true,
            message: 'Success Login!',
            data: payload
          })
        } else {
          response.status(201).send({
            success: false,
            message: 'Wrong password!'
          })
        }
      } else {
        response.status(201).send({
          success: false,
          message: 'Email has not been registered!'
        })
      }
    } else {
      response.status(400).send({
        success: false,
        message: 'All field must be filled!'
      })
    }
  },

  updateAccount: async (req, res) => {
    try {
      let idAccount = ''
      const token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, process.env.KEY_JWT, (error, result, response) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          response.status(403).send({
            success: false,
            message: error.message
          })
        } else {
          idAccount = result.idAccount
        }
      })
      const setData = {
        ...req.body
      }
      const data = Object.entries(setData).map(item => {
        return `${item[0]}='${item[1]}'`
      })
      await updateAccountModel(idAccount, data)
      res.status(201).send({
        success: true,
        message: 'Account has been update!',
        data: setData
      })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  },

  deleteAccount: async (req, res) => {
    try {
      let idAccount = ''
      const token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, process.env.KEY_JWT, (error, result, response) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          response.status(403).send({
            success: false,
            message: error.message
          })
        } else {
          idAccount = result.idAccount
        }
      })
      await deleteAccountModel(idAccount)
      res.status(201).send({
        success: true,
        message: 'Account has been delete!'
      })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  }
}
