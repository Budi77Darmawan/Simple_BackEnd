const db = require('../helper/db')

module.exports = {
  checkExperienceModel: (idAccount, callback, res) => {
    db.query(`SELECT * FROM work_exp WHERE id_account=${idAccount}`, (err, result, field) => {
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
  getExperienceModel: (searchKey, serachValue, limit, offset, callback, res) => {
    const getSql = `SELECT * FROM work_exp WHERE ${searchKey} LIKE '%${serachValue}%' LIMIT ${limit} OFFSET ${offset}`
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
  getExperienceByIDModel: (idAccount, callback, res) => {
    db.query(`SELECT * FROM work_exp WHERE id_account=${idAccount}`, (err, result, field) => {
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
  createExperienceModel: (data, callback, res) => {
    const postSql = `INSERT INTO work_exp (id_account, companyName, position, start, end, description) VALUES ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', '${data[5]}')`
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
  deleteExperienceModel: (idExperience, idAccount, callback, res) => {
    db.query(`DELETE FROM work_exp WHERE id_exp=${idExperience} AND id_account=${idAccount}`, (err, result, field) => {
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
  updateExperienceModel: (idExperience, data, callback, res) => {
    console.log(idExperience)
    const updateSql = `UPDATE work_exp SET ${data}, updateAt=CURRENT_TIMESTAMP WHERE id_exp=${idExperience}`
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
