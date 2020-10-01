require('dotenv')
const jwt = require('jsonwebtoken')

module.exports = {
  authorizationRecruiters: async (req, response, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
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
    } else {
      response.status(403).send({
        success: false,
        message: 'Please input token!!!'
      })
    }
  },
  authorizationFreelancers: async (req, response, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
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
    } else {
      response.status(403).send({
        success: false,
        message: 'Please input token!!!'
      })
    }
  },
  authorization: async (req, response, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
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
    } else {
      response.status(403).send({
        success: false,
        message: 'Please input token!!!'
      })
    }
  }
}
