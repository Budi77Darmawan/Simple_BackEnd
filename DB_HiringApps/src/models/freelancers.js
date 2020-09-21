const db = require('../helper/db')

module.exports = {
  checkFreelancersModel: (idAccount, callback, res) => {
    db.query(`SELECT * FROM freelancers WHERE id_account=${idAccount}`, (err, result, field) => {
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
  getFreelancersModel: (searchKey, serachValue, jobDesc, statusJob, cityAddress, limit, offset, callback, res) => {
    const getSql = `SELECT * FROM freelancers WHERE ${searchKey} LIKE '%${serachValue}%' AND ${jobDesc} AND ${statusJob} AND ${cityAddress} LIMIT ${limit} OFFSET ${offset}`
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
  createFreelancersModel: (data, callback, res) => {
    const postSql = `INSERT INTO freelancers (id_account, jobDesc, statusJob, description, workPlace, cityAddress, image) VALUES ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', '${data[5]}', '${data[6]}')`
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
  deleteFreelancersModel: (idAccount, callback, res) => {
    db.query(`DELETE FROM freelancers WHERE id_account=${idAccount}`, (err, result, field) => {
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
  updateFreelancersModel: (idAccount, data, callback, res) => {
    const updateSql = `UPDATE freelancers SET ${data}, updateAt=CURRENT_TIMESTAMP WHERE id_account=${idAccount}`
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
