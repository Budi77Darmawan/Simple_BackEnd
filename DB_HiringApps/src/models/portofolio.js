const db = require('../helper/db')

module.exports = {
  checkPortofolioModel: (idAccount, idPortfolio) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM portofolio WHERE id_portofolio=${idPortfolio} && id_account=${idAccount}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  listPortofolioModel: (searchKey, searchValue, sort, typeSort, limit, offset) => {
    return new Promise((resolve, reject) => {
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

      db.query(`SELECT * FROM portofolio WHERE ${searchKey} LIKE '%${searchValue}%' ${order} LIMIT ${limit} OFFSET ${offset} `, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  listPortofolioByIDModel: (searchKey, searchValue, sort, typeSort, limit, offset, idAccount) => {
    return new Promise((resolve, reject) => {
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

      db.query(`SELECT * FROM portofolio WHERE id_account = ${idAccount} AND ${searchKey} LIKE '%${searchValue}%' ${order} LIMIT ${limit} OFFSET ${offset} `, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  createPortofolioModel: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO portofolio SET ?', data, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  updatePortofolioModel: (idPortofolio, data) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE portofolio SET ${data}, updateAt=CURRENT_TIMESTAMP WHERE id_portofolio=${idPortofolio}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  deletePortofolioModel: (idPortfolio) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM portofolio WHERE id_portofolio=${idPortfolio}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
