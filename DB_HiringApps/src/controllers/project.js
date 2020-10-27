const {
  checkProjectModel,
  listProjectModel,
  listProjectbyIDModel,
  createProjectModel,
  updateProjectModel,
  deleteProjectModel
} = require('../models/project')
const jwt = require('jsonwebtoken')

module.exports = {
  listProject: async (req, res) => {
    let { page, limit, search, sort, typeSort } = req.query

    let { searchKey, serachValue } = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      serachValue = Object.values(search)[0]
    } else {
      searchKey = 'P.name'
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

    const list = await listProjectModel(searchKey, serachValue, sort, typeSort, limit, offset)
    if (list.length) {
      res.status(201).send({
        success: true,
        message: 'List Project',
        data: list
      })
    } else {
      res.send({
        success: true,
        message: 'There is no List Project'
      })
    }
  },

  listProjectbyID: async (req, res) => {
    const idAccount = req.params.id
    let { page, limit, search, sort, typeSort } = req.query
    let { searchKey, serachValue } = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      serachValue = Object.values(search)[0]
    } else {
      searchKey = 'P.name'
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

    const list = await listProjectbyIDModel(searchKey, serachValue, idAccount, sort, typeSort, limit, offset)
    if (list.length) {
      res.status(201).send({
        success: true,
        message: 'List Project',
        data: list
      })
    } else {
      res.send({
        success: true,
        message: 'There is no List Project'
      })
    }
  },

  createProject: async (req, res) => {
    const { name, description, deadline } = req.body
    let idAccount = ''
    if (name.trim() && description.trim() && deadline.trim()) {
      try {
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
          ...req.body,
          image: req.file.filename
        }
        await createProjectModel(setData)
        res.status(201).send({
          success: true,
          message: 'Project has been created!',
          data: setData
        })
      } catch (error) {
        res.status(500).send({
          success: false,
          message: 'Bad request'
        })
      }
    } else {
      res.status(401).send({
        success: false,
        message: 'All field must be filled!'
      })
    }
  },

  updateProject: async (req, res) => {
    try {
      const idProject = req.params.id
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

      const project = await checkProjectModel(idAccount, idProject)
      if (project.length) {
        await updateProjectModel(idProject, data)
        res.status(201).send({
          success: true,
          message: 'Project has been update!',
          data: setData
        })
      } else {
        res.status(401).send({
          success: false,
          message: 'Project not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  },

  deleteProject: async (req, res) => {
    try {
      const idProject = req.params.id
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
      const project = await checkProjectModel(idAccount, idProject)
      if (project.length) {
        await deleteProjectModel(idProject)
        res.send({
          success: true,
          message: 'Project has been delete!'
        })
      } else {
        res.status(401).send({
          success: false,
          message: 'Project not found!'
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
