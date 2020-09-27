const db = require('../helper/db')

module.exports = {
  checkProjectModel: (idAccount, idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM project WHERE id_project=${idProject} && id_account=${idAccount}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  listProjectModel: (searchKey, searchValue, sort, typeSort, limit, offset) => {
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

      db.query(`SELECT P.id_project, A.id_account, A.name, R.position, R.companyName, R.city, P.name AS name_project, P.description, P.deadline FROM account AS A INNER JOIN recruiters AS R ON A.id_account = R.id_account INNER JOIN project AS P ON R.id_account = P.id_account WHERE ${searchKey} LIKE '%${searchValue}%' ${order} LIMIT ${limit} OFFSET ${offset} `, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  createProjectModel: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO project SET ?', data, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  updateProjectModel: (idProject, data) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE project SET ${data}, updateAt=CURRENT_TIMESTAMP WHERE id_project=${idProject}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  deleteProjectModel: (idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM project WHERE id_project=${idProject}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
