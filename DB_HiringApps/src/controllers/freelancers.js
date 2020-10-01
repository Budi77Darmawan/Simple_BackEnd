const {
  listFreelancersModel,
  updateFreelancersModel
} = require('../models/freelancers')
const jwt = require('jsonwebtoken')

module.exports = {
  listFreelancers: async (req, res) => {
    let { page, limit, search, jobDesc, statusJob, cityAddress, sort, typeSort } = req.query

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

    const list = await listFreelancersModel(searchKey, serachValue, jobDesc, statusJob, cityAddress, sort, typeSort, limit, offset)
    if (list.length) {
      res.status(201).send({
        success: true,
        message: 'List Freelancers',
        data: list
      })
    } else {
      res.send({
        success: true,
        message: 'There is no List Freelancers'
      })
    }
  },

  updateFreelancers: async (req, res) => {
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

      let setData = {}
      if (req.file) {
        setData = {
          ...req.body,
          image: req.file.filename
        }
      } else {
        setData = {
          ...req.body
        }
      }

      const data = Object.entries(setData).map(item => {
        return `${item[0]}='${item[1]}'`
      })
      await updateFreelancersModel(idAccount, data)
      res.status(201).send({
        success: true,
        message: 'Profile account has been update!',
        data: setData
      })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  }
}
