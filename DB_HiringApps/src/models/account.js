const db = require('../helper/db')

module.exports = {
  checkAccountModel: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM account WHERE email=?', email, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  registerAccountModel: (data, company, position) => {
    return new Promise((resolve, reject) => {
      db.query('BEGIN')
      db.query('INSERT INTO account SET ?', data)
      if (data.roleAccount === 'Freelancers') {
        db.query('INSERT INTO freelancers (id_account) VALUES (LAST_INSERT_ID())')
      } else {
        db.query(`INSERT INTO recruiters (id_account, companyName, position) VALUES (LAST_INSERT_ID(), '${company}', '${position}')`)
      }
      db.query('COMMIT', (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  updateAccountModel: (idAccount, data) => {
    return new Promise((resolve, reject) => {
      console.log(idAccount)
      console.log(data)
      db.query(`UPDATE account SET ${data}, updateAt=CURRENT_TIMESTAMP WHERE id_account=${idAccount}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  deleteAccountModel: (idAccount) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM account WHERE id_account=?', idAccount, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
