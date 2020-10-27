const db = require('../helper/db')

module.exports = {
  listRecruitersModel: (searchKey, searchValue, sector, city, sort, typeSort, limit, offset) => {
    return new Promise((resolve, reject) => {
      let filter = ''
      if (!sector) {
        filter = `sector LIKE '%${''}%'`
      } else {
        filter = `sector = '${sector}'`
      }
      if (!city) {
        filter += ` AND city LIKE '%${''}%'`
      } else {
        filter += ` AND city = '${city}'`
      }

      let order = ''
      if (sort) {
        order = `ORDER BY ${sort}`
      } else {
        order = 'ORDER BY id_account'
      }
      if (typeSort) {
        order += ` ${typeSort}`
      } else {
        order += ' ASC'
      }

      db.query(`SELECT A.id_account, A.name, R.companyName, R.position, R.sector, R.city, R.description, R.website, R.image FROM account AS A INNER JOIN recruiters AS R ON A.id_account = R.id_account WHERE ${searchKey} LIKE '%${searchValue}%' AND ${filter} ${order} LIMIT ${limit} OFFSET ${offset} `, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  listRecruitersbyIDModel: (idAccount) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT A.id_account, A.name, R.companyName, R.position, R.sector, R.city, R.description, R.website, R.image FROM account AS A INNER JOIN recruiters AS R ON A.id_account = R.id_account WHERE A.id_account = ${idAccount} `, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  updateRecruitersModel: (idAccount, data) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE recruiters SET ${data}, updateAt=CURRENT_TIMESTAMP WHERE id_account=${idAccount}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
