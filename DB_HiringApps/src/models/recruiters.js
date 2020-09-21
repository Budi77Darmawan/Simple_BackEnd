const db = require('../helper/db')

module.exports = {
  checkRecruitersModel: (idAccount, callback, res) => {
    db.query(`SELECT * FROM recruiters WHERE id_account=${idAccount}`, (err, result, field) => {
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
  getRecruitersModel: (searchKey, serachValue, companyName, sector, city, limit, offset, callback, res) => {
    console.log(searchKey, serachValue, companyName, sector, city, limit, offset)
    const getSql = `SELECT * FROM recruiters WHERE ${searchKey} LIKE '%${serachValue}%' AND ${companyName} AND ${sector} AND ${city} LIMIT ${limit} OFFSET ${offset}`
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
  createRecruitersModel: (data, callback, res) => {
    const postSql = `INSERT INTO recruiters (id_account, companyName, sector, city, description, website, image) VALUES ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', '${data[5]}', '${data[6]}')`
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
  deleteRecruitersModel: (idAccount, callback, res) => {
    db.query(`DELETE FROM recruiters WHERE id_account=${idAccount}`, (err, result, field) => {
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
  updateRecruitersModel: (idAccount, data, callback, res) => {
    const updateSql = `UPDATE recruiters SET ${data}, updateAt=CURRENT_TIMESTAMP WHERE id_account=${idAccount}`
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
