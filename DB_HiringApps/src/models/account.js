const db = require('../helper/db')

module.exports = {
  checkAccountModel: (idAccount, callback, res) => {
    db.query(`SELECT * FROM account WHERE id_account=${idAccount}`, (err, result, field) => {
      if (!err) {
        callback(result)
      } else {
        res.send({
          success: false,
          message: 'Internal server error' + err
        })
      }
    })
  },
  checkEmailModel: (email, callback, res) => {
    db.query(`SELECT * FROM account WHERE email='${email}'`, (err, result, field) => {
      if (!err) {
        callback(result)
      } else {
        res.send({
          success: false,
          message: 'Internal server error' + err
        })
      }
    })
  },
  getAccountModel: (searchKey, serachValue, limit, offset, callback, res) => {
    const getSql = `SELECT * FROM account WHERE ${searchKey} LIKE '%${serachValue}%' LIMIT ${limit} OFFSET ${offset}`
    db.query(getSql, (err, result, _field) => {
      if (!err) {
        callback(result)
      } else {
        res.send({
          success: false,
          message: 'Internal server error' + err
        })
      }
    })
  },
  getAccountByIDModel: (idAccount, callback, res) => {
    db.query(`SELECT * FROM account WHERE id_account=${idAccount}`, (err, result, field) => {
      if (!err) {
        callback(result)
      } else {
        res.send({
          success: false,
          message: 'Internal server error' + err
        })
      }
    })
  },
  createAccountModel: (data, callback, res) => {
    const postSql = `INSERT INTO account (typeAccount, name, email, numberPhone, password) VALUES ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}')`
    db.query(postSql, (err, result, _field) => {
      if (!err) {
        callback(result)
      } else {
        res.send({
          success: false,
          message: 'Internal server error' + err
        })
      }
    })
  },
  deleteAccountModel: (idAccount, callback, res) => {
    db.query(`DELETE FROM account WHERE id_account=${idAccount}`, (err, result, field) => {
      if (!err) {
        callback(result)
      } else {
        res.send({
          success: false,
          message: 'Internal server error' + err
        })
      }
    })
  },
  updateAccountModel: (idAccount, data, callback, res) => {
    const updateSql = `UPDATE account SET ${data}, updateAt=CURRENT_TIMESTAMP WHERE id_account=${idAccount}`
    db.query(updateSql, (err, result, _field) => {
      if (!err) {
        callback(result)
      } else {
        res.send({
          success: false,
          message: 'Internal server error' + err
        })
      }
    })
  }
}
