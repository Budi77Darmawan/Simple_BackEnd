const {
  checkProjectModel,
  listProjectModel,
  createProjectModel,
  updateProjectModel,
  deleteProjectModel
} = require('../models/project')

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

  createProject: async (req, res) => {
    try {
      const { idAccount } = req.query
      const setData = {
        id_account: idAccount,
        ...req.body,
        image: req.file.filename
      }
      await createProjectModel(setData)
      res.status(201).send({
        success: true,
        message: `Project account id ${idAccount} has been create!`,
        data: setData
      })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  },

  updateProject: async (req, res) => {
    try {
      const idProject = req.params.id
      const { idAccount } = req.query
      const setData = {
        ...req.body,
        image: req.file.filename
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
      const { idAccount } = req.query
      const project = await checkProjectModel(idAccount, idProject)
      if (project.length) {
        await deleteProjectModel(idProject)
        res.status(201).send({
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
