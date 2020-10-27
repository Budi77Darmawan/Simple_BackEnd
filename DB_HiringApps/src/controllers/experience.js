const {
  checkExperienceModel,
  listExperienceModel,
  listExperienceByIDModel,
  createExperienceModel,
  updateExperienceModel,
  deleteExperienceModel
} = require('../models/experience')

const jwt = require('jsonwebtoken')
require('dotenv')

module.exports = {
  listExperience: async (req, res) => {
    let { page, limit, search, sort, typeSort } = req.query

    let { searchKey, serachValue } = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      serachValue = Object.values(search)[0]
    } else {
      searchKey = 'companyName'
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

    const list = await listExperienceModel(searchKey, serachValue, sort, typeSort, limit, offset)
    if (list.length) {
      res.status(201).send({
        success: true,
        message: 'List Experience',
        data: list
      })
    } else {
      res.send({
        success: true,
        message: 'There is no List Expereince'
      })
    }
  },

  listExperienceByID: async (req, res) => {
    const idAccount = req.params.id
    let { page, limit, search, sort, typeSort } = req.query

    let { searchKey, serachValue } = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      serachValue = Object.values(search)[0]
    } else {
      searchKey = 'companyName'
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

    const list = await listExperienceByIDModel(searchKey, serachValue, sort, typeSort, limit, offset, idAccount)
    if (list.length) {
      res.status(201).send({
        success: true,
        message: 'List Experience',
        data: list
      })
    } else {
      res.send({
        success: true,
        message: 'There is no List Expereince'
      })
    }
  },

  createExperience: async (req, res) => {
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
        id_account: idAccount,
        ...req.body
      }
      await createExperienceModel(setData)
      res.status(201).send({
        success: true,
        message: 'Experience has been created!',
        data: setData
      })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  },

  updateExperience: async (req, res) => {
    try {
      const idExp = req.params.id
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
      const project = await checkExperienceModel(idAccount, idExp)
      if (project.length) {
        await updateExperienceModel(idExp, data)
        res.status(201).send({
          success: true,
          message: 'Experience has been update!',
          data: setData
        })
      } else {
        res.status(401).send({
          success: false,
          message: 'Experience not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  },

  deleteExperience: async (req, res) => {
    try {
      const idExp = req.params.id
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
      const project = await checkExperienceModel(idAccount, idExp)
      if (project.length) {
        await deleteExperienceModel(idExp)
        res.status(201).send({
          success: true,
          message: 'Experience has been delete!'
        })
      } else {
        res.status(401).send({
          success: false,
          message: 'Experience not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  }
}
