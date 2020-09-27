const db = require('../helper/db')

module.exports = {
  createHireProjectsModel: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO hire_project SET ?', data, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  updateHireProjectModel: (idHire, data) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE hire_project SET ${data}, updateAt=CURRENT_TIMESTAMP WHERE id_hire=${idHire}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  deleteHireProjectModel: (idAccount, idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM hire_job WHERE id_accountRec=${idAccount} && id_project=${idProject}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
