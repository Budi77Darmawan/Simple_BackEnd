const {
  getFreelancersModel,
  checkFreelancersModel,
  createFreelancersModel,
  updateFreelancersModel,
  deleteFreelancersModel
} = require('../models/freelancers')

module.exports = {
  getFreelancers: (req, res) => {
    let { page, limit, search, jobDesc, statusJob, cityAddress } = req.query

    let { searchKey, serachValue, filterCityAddress, filterJobDesc, filterStatusJob } = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      serachValue = Object.values(search)[0]
    } else {
      searchKey = 'jobDesc'
      serachValue = search || ''
    }

    if (jobDesc) {
      filterJobDesc = `jobDesc='${jobDesc}'`
    } else {
      filterJobDesc = `jobDesc LIKE '%${''}%'`
    }
    if (statusJob) {
      filterStatusJob = `statusJob='${statusJob}'`
    } else {
      filterStatusJob = `statusJob LIKE '%${''}%'`
    }
    if (cityAddress) {
      filterCityAddress = `cityAddress='${cityAddress}'`
    } else {
      filterCityAddress = `cityAddress LIKE '%${''}%'`
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

    getFreelancersModel(searchKey, serachValue, filterJobDesc, filterStatusJob, filterCityAddress, limit, offset, result => {
      if (result.length) {
        res.status(201).send({
          success: true,
          message: 'List Freelancers',
          data: result
        })
      } else {
        res.send({
          success: true,
          message: 'There is no List Freelancers'
        })
      }
    })
  },

  createFreelancers: (req, res) => {
    const { jobDesc, statusJob, description, workPlace, cityAddress, image } = req.body
    const { idAccount } = req.query

    if (!idAccount) {
      res.status(500).send({
        success: false,
        message: 'Input ID'
      })
    } else {
      const data = [idAccount, jobDesc, statusJob, description, workPlace, cityAddress, image]
      if (jobDesc && statusJob && description && workPlace && cityAddress && image) {
        checkFreelancersModel(idAccount, result => {
          if (result.length) {
            res.status(500).send({
              success: false,
              message: `Profile account with id ${idAccount} already exists!`
            })
          } else {
            createFreelancersModel(data, result => {
              res.status(201).send({
                success: true,
                message: `Profile account with id ${idAccount} has been created!`
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

  updateFreelancers: (req, res) => {
    const { jobDesc, statusJob, description, workPlace, cityAddress, image } = req.body
    const { idAccount } = req.query

    if (jobDesc || statusJob || image || description || workPlace || cityAddress) {
      checkFreelancersModel(idAccount, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return `${item[0]}='${item[1]}'`
          })
          updateFreelancersModel(idAccount, data, result => {
            if (result.changedRows) {
              res.status(201).send({
                success: true,
                message: `Profile account id ${idAccount} has been update`
              })
            } else {
              res.status(201).send({
                success: false,
                message: 'Nothing was update in profile account!'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: `Account id ${idAccount} does not have a profile`
          })
        }
      })
    }
  },

  deleteFreelancers: (req, res) => {
    const { idAccount } = req.query
    checkFreelancersModel(idAccount, result => {
      if (result.length) {
        deleteFreelancersModel(idAccount, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Profile account id ${idAccount} has been delete!`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed to delete profile account'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: `Profile account id ${idAccount} not found!`
        })
      }
    })
  }

}
