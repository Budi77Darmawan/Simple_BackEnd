const {
  createHireProjectsModel,
  updateHireProjectModel,
  deleteHireProjectModel
} = require('../models/hire_project')
const jwt = require('jsonwebtoken')

module.exports = {
  createHireProject: async (req, res) => {
    try {
      const { idProject } = req.query
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
        id_accountRec: idAccount,
        id_project: idProject,
        ...req.body
      }
      await createHireProjectsModel(setData)
      res.status(201).send({
        success: true,
        message: 'Hire Project has been added!',
        data: setData
      })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  },

  updateHireProject: async (req, res) => {
    try {
      const idHireProject = req.params.id
      const { idProject } = req.query
      const { message, projectJob, price, statusConfirm } = req.body

      let setData = {}
      const token = req.headers.authorization.split(' ')[1]
      if (token) {
        jwt.verify(token, process.env.KEY_JWT, (error, result, res) => {
          if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
            res.status(403).send({
              success: false,
              message: error.message
            })
          } else {
            if (result.roleAccount === 'Superuser') {
              setData = {
                id_account: result.idAccount,
                id_project: idProject,
                message,
                projectJob,
                price,
                statusConfirm,
                confirmDate: new Date()
              }
            } else if (result.roleAccount === 'Recruiters') {
              setData = {
                id_account: result.idAccount,
                id_project: idProject,
                message,
                projectJob,
                price
              }
            } else {
              setData = {
                id_account: result.idAccount,
                id_project: idProject,
                statusConfirm,
                confirmDate: new Date()
              }
            }
          }
        })
      }
      const data = Object.entries(setData).map(item => {
        return `${item[0]}='${item[1]}'`
      })
      await updateHireProjectModel(idHireProject, data)
      res.status(201).send({
        success: true,
        message: 'Skill has been update!',
        data: setData
      })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  },

  deleteHireProject: async (req, res) => {
    try {
      const { idAccount } = req.query
      const { idProject } = req.body
      await deleteHireProjectModel(idAccount, idProject)
      res.status(201).send({
        success: true,
        message: 'Skill has been delete!'
      })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  }
}
