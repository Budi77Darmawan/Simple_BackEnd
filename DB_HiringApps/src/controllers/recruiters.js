const {
  getRecruitersModel,
  checkRecruitersModel,
  createRecruitersModel,
  updateRecruitersModel,
  deleteRecruitersModel
} = require('../models/recruiters')

module.exports = {
  getRecruiters: (req, res) => {
    let { page, limit, search, companyName, sector, city } = req.query

    let { searchKey, serachValue, filterCompanyName, filterSector, filterCity } = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      serachValue = Object.values(search)[0]
    } else {
      searchKey = 'companyName'
      serachValue = search || ''
    }

    if (companyName) {
      filterCompanyName = `companyName='${companyName}'`
    } else {
      filterCompanyName = `companyName LIKE '%${''}%'`
    }
    if (sector) {
      filterSector = `sector='${sector}'`
    } else {
      filterSector = `sector LIKE '%${''}%'`
    }
    if (city) {
      filterCity = `city='${city}'`
    } else {
      filterCity = `city LIKE '%${''}%'`
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

    getRecruitersModel(searchKey, serachValue, filterCompanyName, filterSector, filterCity, limit, offset, result => {
      if (result.length) {
        res.status(201).send({
          success: true,
          message: 'List Recruiters',
          data: result
        })
      } else {
        res.send({
          success: true,
          message: 'There is no List Recruiters'
        })
      }
    })
  },

  createRecruiters: (req, res) => {
    const { companyName, sector, city, description, website, image } = req.body
    const { idAccount } = req.query

    if (!idAccount) {
      res.status(500).send({
        success: false,
        message: 'Input ID'
      })
    } else {
      const data = [idAccount, companyName, sector, city, description, website, image]
      if (companyName && sector && description && city && website && image) {
        checkRecruitersModel(idAccount, result => {
          if (result.length) {
            res.status(500).send({
              success: false,
              message: `Profile account with id ${idAccount} already exists!`
            })
          } else {
            createRecruitersModel(data, result => {
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

  updateRecruiters: (req, res) => {
    const { companyName, sector, city, description, website, image } = req.body
    const { idAccount } = req.query

    if (companyName || sector || description || city || website || image) {
      checkRecruitersModel(idAccount, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return `${item[0]}='${item[1]}'`
          })
          updateRecruitersModel(idAccount, data, result => {
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

  deleteRecruiters: (req, res) => {
    const { idAccount } = req.query
    checkRecruitersModel(idAccount, result => {
      if (result.length) {
        deleteRecruitersModel(idAccount, result => {
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
