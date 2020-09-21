const {
  checkExperienceModel,
  getExperienceModel,
  getExperienceByIDModel,
  createExperienceModel,
  deleteExperienceModel,
  updateExperienceModel
} = require('../models/experience')

module.exports = {
  getExperience: (req, res) => {
    let { page, limit, search } = req.query

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

    getExperienceModel(searchKey, serachValue, limit, offset, result => {
      if (result.length) {
        res.status(201).send({
          success: true,
          message: 'List Experience',
          data: result
        })
      } else {
        res.send({
          success: true,
          message: 'There is no experience on list'
        })
      }
    })
  },

  getExperienceByID: (req, res) => {
    const id = req.params.id
    getExperienceByIDModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Experience account with id ${id}`,
          data: result
        })
      } else {
        res.send({
          success: false,
          message: `No experience found on account with ID ${id}!`
        })
      }
    })
  },

  createExperience: (req, res) => {
    const { companyName, position, start, end, description } = req.body
    const { idAccount } = req.query

    if (!idAccount) {
      res.status(500).send({
        success: false,
        message: `Error ${idAccount}`
      })
    } else {
      if (companyName && position && start && end && description) {
        createExperienceModel([idAccount, companyName, position, start, end, description], result => {
          res.status(201).send({
            success: true,
            message: 'Experience has been created!'
          })
        })
      } else {
        res.status(500).send({
          success: false,
          message: 'All field must be filled!'
        })
      }
    }
  },

  deleteExperience: (req, res) => {
    const { idAccount, idExperience } = req.query
    checkExperienceModel(idAccount, result => {
      if (result.length) {
        deleteExperienceModel(idExperience, idAccount, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Account id ${idAccount} with project id ${idExperience} has been delete!`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed to delete experience'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: `Account id ${idAccount} with experience id ${idExperience} not found!`
        })
      }
    })
  },

  updateExperience: (req, res) => {
    const { companyName, position, start, end, description } = req.body
    const { idAccount, idExperience } = req.query

    if (companyName || position || start || end || description) {
      checkExperienceModel(idAccount, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return `${item[0]}='${item[1]}'`
          })
          updateExperienceModel(idExperience, data, result => {
            if (result.changedRows) {
              res.status(201).send({
                success: true,
                message: `Account id ${idAccount} with experience id ${idExperience} has been update`
              })
            } else {
              res.status(201).send({
                success: false,
                message: 'Nothing was update in experience!'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: `Account id ${idAccount} with experience id ${idExperience} not found!`
          })
        }
      })
    }
  }
}
