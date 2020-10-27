const {
  checkPortofolioModel,
  listPortofolioModel,
  listPortofolioByIDModel,
  createPortofolioModel,
  updatePortofolioModel,
  deletePortofolioModel
} = require('../models/portofolio')

const jwt = require('jsonwebtoken')
require('dotenv')

module.exports = {
  listPortofolio: async (req, res) => {
    let { page, limit, search, sort, typeSort } = req.query

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

    const list = await listPortofolioModel(searchKey, serachValue, sort, typeSort, limit, offset)
    if (list.length) {
      res.status(201).send({
        success: true,
        message: 'List Portofolio',
        data: list
      })
    } else {
      res.send({
        success: true,
        message: 'There is no List Portofolio'
      })
    }
  },

  listPortofolioByID: async (req, res) => {
    const idAccount = req.params.id
    let { page, limit, search, sort, typeSort } = req.query

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

    const list = await listPortofolioByIDModel(searchKey, serachValue, sort, typeSort, limit, offset, idAccount)
    if (list.length) {
      res.status(201).send({
        success: true,
        message: 'List Portofolio',
        data: list
      })
    } else {
      res.send({
        success: true,
        message: 'There is no List Portofolio'
      })
    }
  },

  createPortofolio: async (req, res) => {
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
          id_account: idAccount,
          image: req.file.filename
        }
      } else {
        setData = {
          id_account: idAccount,
          ...req.body
        }
      }

      await createPortofolioModel(setData)
      res.status(201).send({
        success: true,
        message: 'Portfolio has been created!',
        data: setData
      })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  },

  updatePortofolio: async (req, res) => {
    try {
      const idPortofolio = req.params.id
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
      const project = await checkPortofolioModel(idAccount, idPortofolio)
      if (project.length) {
        await updatePortofolioModel(idPortofolio, data)
        res.status(201).send({
          success: true,
          message: 'Portfolio has been update!',
          data: setData
        })
      } else {
        res.status(401).send({
          success: false,
          message: 'Portfolio not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  },

  deletePortofolio: async (req, res) => {
    try {
      const idPortofolio = req.params.id
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
      const project = await checkPortofolioModel(idAccount, idPortofolio)
      if (project.length) {
        await deletePortofolioModel(idPortofolio)
        res.status(201).send({
          success: true,
          message: 'Portfolio has been delete!'
        })
      } else {
        res.status(401).send({
          success: false,
          message: 'Portofolio not found!'
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
