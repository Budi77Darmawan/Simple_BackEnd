require('dotenv')
const jwt = require('jsonwebtoken')
const { getAuthModel } = require('../models/auth')

module.exports = {
  authorizationRecruiters: async (req, response, next) => {
    const { idAccount } = req.query
    const token = await getAuthModel(idAccount)

    if (token) {
      jwt.verify(token, process.env.KEY_JWT, (error, result) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          response.status(403).send({
            success: false,
            message: error.message
          })
        } else {
          if (result.roleAccount === 'Recruiters' || result.roleAccount === 'Superuser') {
            next()
          } else {
            response.status(403).send({
              success: false,
              message: 'You cant be access this!'
            })
          }
        }
      })
    }
  },
  authorizationFreelancers: async (req, response, next) => {
    const { idAccount } = req.query
    const token = await getAuthModel(idAccount)

    if (token) {
      jwt.verify(token, process.env.KEY_JWT, (error, result) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          response.status(403).send({
            success: false,
            message: error.message
          })
        } else {
          if (result.roleAccount === 'Freelancers' || result.roleAccount === 'Superuser') {
            next()
          } else {
            response.status(403).send({
              success: false,
              message: 'You cant be access this!'
            })
          }
        }
      })
    }
  },
  authorization: async (req, response, next) => {
    const { idAccount } = req.query
    const token = await getAuthModel(idAccount)

    if (token) {
      jwt.verify(token, process.env.KEY_JWT, (error, result) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          response.status(403).send({
            success: false,
            message: error.message
          })
        } else {
          next()
        }
      })
    }
  }
}
