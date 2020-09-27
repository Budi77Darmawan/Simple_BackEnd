const {
  listRecruitersModel,
  updateRecruitersModel
} = require('../models/recruiters')

module.exports = {
  listRecruiters: async (req, res) => {
    let { page, limit, search, sector, city, sort, typeSort } = req.query

    let { searchKey, serachValue } = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      serachValue = Object.values(search)[0]
    } else {
      searchKey = 'CompanyName'
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

    const list = await listRecruitersModel(searchKey, serachValue, sector, city, sort, typeSort, limit, offset)
    if (list.length) {
      res.status(201).send({
        success: true,
        message: 'List Recruiters',
        data: list
      })
    } else {
      res.send({
        success: true,
        message: 'There is no List Recruiters'
      })
    }
  },

  updateRecruiters: async (req, res) => {
    try {
      const { idAccount } = req.query
      const setData = {
        ...req.body,
        image: req.file.filename
      }
      const data = Object.entries(setData).map(item => {
        return `${item[0]}='${item[1]}'`
      })
      await updateRecruitersModel(idAccount, data)
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
