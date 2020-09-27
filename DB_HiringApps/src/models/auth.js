const db = require('../helper/db')

module.exports = {
  getAuthModel: (idAccount) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT auth FROM account WHERE id_account=${idAccount}`, (error, result) => {
        if (!error) {
          resolve(result[0].auth)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  postAuthModel: (idAccount, token) => {
    return new Promise((resolve, reject) => {
      console.log(token)
      db.query(`UPDATE account SET auth='${token}' WHERE id_account=${idAccount}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
