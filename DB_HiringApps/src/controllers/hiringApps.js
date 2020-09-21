const {
  getFreelancersModel
} = require('../models/hiringApps')

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
  }
}
