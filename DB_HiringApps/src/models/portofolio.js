const db = require('../helper/db')

module.exports = {
  checkExperienceModel: (idAccount, idExp) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM work_exp WHERE id_exp=${idExp} && id_account=${idAccount}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  listExperienceModel: (searchKey, searchValue, sort, typeSort, limit, offset) => {
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

      db.query(`SELECT * FROM work_exp WHERE ${searchKey} LIKE '%${searchValue}%' ${order} LIMIT ${limit} OFFSET ${offset} `, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  createExperienceModel: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO work_exp SET ?', data, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  updateExperienceModel: (idExp, data) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE work_exp SET ${data}, updateAt=CURRENT_TIMESTAMP WHERE id_exp=${idExp}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  deleteExperienceModel: (idExp) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM work_exp WHERE id_exp=${idExp}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
