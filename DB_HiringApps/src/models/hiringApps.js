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
  }
}
