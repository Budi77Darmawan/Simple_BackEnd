const {
  checkHireProjectModel,
  listHireProjectModel,
  createHireProjectsModel,
  updateHireProjectModel,
  deleteHireProjectModel,
  listFreelancersProjectModel
} = require('../models/hire_project')
const jwt = require('jsonwebtoken')

module.exports = {
  createHireProject: async (req, res) => {
    try {
      const { idProject, idFree, message, projectJob, price } = req.body
      let idAccount = ''
      const token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, process.env.KEY_JWT, (error, result, response) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          response.status(403).send({
            success: false,
            message: error.message
          })
        } else {
          if (result.roleAccount === 'Recruiters') {
            idAccount = result.idAccount
          } else {
            res.status(500).send({
              success: false,
              message: 'You cant access this'
            })
          }
        }
      })

      const setData = {
        id_accountRec: idAccount,
        id_project: idProject,
        id_accountFree: idFree,
        message,
        projectJob,
        price
      }
      const checkHire = await checkHireProjectModel(idAccount, idFree, idProject)
      if (!checkHire.length) {
        await createHireProjectsModel(setData)
        res.status(201).send({
          success: true,
          message: 'Hire Project success send to Freelancer!',
          data: setData
        })
      } else {
        res.status(201).send({
          success: false,
          message: 'You dont recruit the same people'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  },

  listHireProject: async (req, res) => {
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
      const result = await listHireProjectModel(idAccount)
      res.status(201).send({
        success: true,
        message: 'List Hire Freelancer!',
        data: result
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
      const { idProject, message, projectJob, price, statusConfirm } = req.body

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
                id_accountRec: result.idAccount,
                id_hire: idHireProject,
                message,
                projectJob,
                price
              }
            } else {
              setData = {
                id_accountFree: result.idAccount,
                id_hire: idHireProject,
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
        message: 'Hire Project been update!',
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
  },

  listFreelancersProject: async (req, res) => {
    try {
      const { idProject } = req.query
      const result = await listFreelancersProjectModel(idProject)
      res.status(201).send({
        success: true,
        message: `List Freelancers in Project id ${idProject}!`,
        data: result
      })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  }
}
