const db = require('../helper/db')

module.exports = {
  checkProjectModel: (idAccount, idProject, callback, res) => {
    db.query(`SELECT * FROM project WHERE id_account=${idAccount} AND id_project=${idProject}`, (err, result, field) => {
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
  checkNameModel: (name, callback, res) => {
    db.query(`SELECT * FROM project WHERE name='${name}'`, (err, result, field) => {
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
  getProjectModel: (searchKey, serachValue, limit, offset, callback, res) => {
    const getSql = `SELECT * FROM project WHERE ${searchKey} LIKE '%${serachValue}%' LIMIT ${limit} OFFSET ${offset}`
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
  getProjectByIDModel: (idProject, callback, res) => {
    db.query(`SELECT * FROM project WHERE id_project=${idProject}`, (err, result, field) => {
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
  createProjectModel: (data, callback, res) => {
    const postSql = `INSERT INTO project (id_account, name, image, description, deadline) VALUES ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}')`
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
  deleteProjectModel: (idProject, callback, res) => {
    db.query(`DELETE FROM project WHERE id_project=${idProject}`, (err, result, field) => {
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
  updateProjectModel: (idProject, data, callback, res) => {
    const updateSql = `UPDATE project SET ${data}, updateAt=CURRENT_TIMESTAMP WHERE id_project=${idProject}`
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
