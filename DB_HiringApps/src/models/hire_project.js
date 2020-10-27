const db = require('../helper/db')

module.exports = {
  checkHireProjectModel: (idRec, idFree, idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM hire_project WHERE id_accountRec=${idRec} && id_accountFree=${idFree} && id_project=${idProject}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
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
  listHireProjectModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT HP.id_hire, HP.id_project, account.name AS name_recruiter, R.companyName, A.name AS name_freelancer, F.image AS image_free, P.image AS image_project, P.name AS project_name, P.deadline AS project_deadline, P.description AS project_description, HP.id_project, HP.projectJob, HP.message, HP.price, HP.statusConfirm FROM account AS A INNER JOIN hire_project AS HP ON A.id_account = HP.id_accountFree INNER JOIN freelancers AS F ON HP.id_accountFree = F.id_account INNER JOIN project AS P ON HP.id_project = P.id_project INNER JOIN account ON account.id_account = HP.id_accountRec INNER JOIN recruiters AS R ON R.id_account = account.id_account WHERE HP.id_accountRec = ${id} OR HP.id_accountFree = ${id} ORDER BY HP.createdAT DESC`, (error, result) => {
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
      db.query(`UPDATE hire_project SET ${data} , updateAt=CURRENT_TIMESTAMP WHERE id_hire=${idHire}`, (error, result) => {
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
  },
  listFreelancersProjectModel: (idProject) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT HP.id_project, A.name AS name_freelancers, F.image AS image_freelancers, F.jobDesc AS job_freelancers FROM account AS A INNER JOIN hire_project AS HP ON A.id_account = HP.id_accountFree INNER JOIN freelancers AS F ON HP.id_accountFree = F.id_account INNER JOIN project AS P ON HP.id_project = P.id_project WHERE HP.id_project = ${idProject} AND HP.statusConfirm = 1 ORDER BY F.jobDesc ASC`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
