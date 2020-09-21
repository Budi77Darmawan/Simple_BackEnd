const {
  checkProjectModel,
  checkNameModel,
  getProjectModel,
  getProjectByIDModel,
  createProjectModel,
  deleteProjectModel,
  updateProjectModel
} = require('../models/project')

module.exports = {
  getProject: (req, res) => {
    let { page, limit, search } = req.query

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

    getProjectModel(searchKey, serachValue, limit, offset, result => {
      if (result.length) {
        res.status(201).send({
          success: true,
          message: 'List Project',
          data: result
        })
      } else {
        res.send({
          success: true,
          message: 'There is no project on list'
        })
      }
    })
  },

  getProjectByID: (req, res) => {
    const id = req.params.id
    getProjectByIDModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Project account with id ${id}`,
          data: result
        })
      } else {
        res.send({
          success: false,
          message: `Project with id ${id} not found!`
        })
      }
    })
  },

  createProject: (req, res) => {
    const { name, image, description, deadline } = req.body
    const { idAccount } = req.query

    if (!idAccount) {
      res.status(500).send({
        success: false,
        message: `Error ${idAccount}`
      })
    } else {
      if (name && image && description && deadline) {
        checkNameModel(name, result => {
          if (result.length) {
            res.status(500).send({
              success: false,
              message: 'Name Project has been registered!'
            })
          } else {
            createProjectModel([idAccount, name, image, description, deadline], result => {
              res.status(201).send({
                success: true,
                message: 'Project has been created!'
              })
            })
          }
        })
      } else {
        res.status(500).send({
          success: false,
          message: 'All field must be filled!'
        })
      }
    }
  },

  deleteProject: (req, res) => {
    const { idAccount, idProject } = req.query
    checkProjectModel(idAccount, idProject, result => {
      if (result.length) {
        deleteProjectModel(idProject, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Account id ${idAccount} with project id ${idProject} has been delete!`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed to delete project'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: `Account id ${idAccount} with project id ${idProject} not found!`
        })
      }
    })
  },

  updateProject: (req, res) => {
    const { name, image, description, deadline } = req.body
    const { idAccount, idProject } = req.query
    console.log(`${idAccount}, ${idProject}`)
    if (name || image || description || deadline) {
      checkProjectModel(idAccount, idProject, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return `${item[0]}='${item[1]}'`
          })
          updateProjectModel(idProject, data, result => {
            if (result.changedRows) {
              res.status(201).send({
                success: true,
                message: `Account id ${idAccount} with project id ${idProject} has been update`
              })
            } else {
              res.status(201).send({
                success: false,
                message: 'Nothing was update in project!'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: `Account id ${idAccount} with project id ${idProject} not found!`
          })
        }
      })
    }
  }
}
